"""
MERAZ 6.0 Vector Database Builder
Creates a semantic search system for the MERAZ festival chatbot
Using ChromaDB for vector storage and sentence-transformers for embeddings
"""

import os
import re
from typing import List, Dict, Tuple
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

class MerazVectorDB:
    def __init__(self, markdown_file_path: str, db_path: str = "./meraz_chroma_db"):
        """
        Initialize the vector database for MERAZ information
        
        Args:
            markdown_file_path: Path to the MERAZ_6.0_INFO.md file
            db_path: Path where ChromaDB will store data
        """
        self.markdown_file_path = markdown_file_path
        self.db_path = db_path
        
        # Initialize embedding model (free, works offline)
        print("Loading embedding model...")
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Embedding model loaded!")
        
        # Initialize ChromaDB
        self.client = chromadb.PersistentClient(path=db_path)
        
        # Create or get collection
        self.collection = self.client.get_or_create_collection(
            name="meraz_info",
            metadata={"description": "MERAZ 6.0 Festival Information"}
        )
        
    def chunk_markdown(self, content: str) -> List[Dict[str, str]]:
        """
        Intelligently chunk the markdown content into semantic pieces
        
        Returns:
            List of dictionaries with 'text', 'metadata', and 'id'
        """
        chunks = []
        chunk_id = 0
        
        # Split by main sections (## headers)
        sections = re.split(r'\n## ', content)
        
        for section_idx, section in enumerate(sections):
            if not section.strip():
                continue
            
            # Get section title
            lines = section.split('\n')
            section_title = lines[0].replace('#', '').strip()
            section_content = '\n'.join(lines[1:])
            
            # For very large sections, split by subsections (###)
            if len(section_content) > 2000:
                subsections = re.split(r'\n### ', section_content)
                
                for subsec_idx, subsection in enumerate(subsections):
                    if not subsection.strip():
                        continue
                    
                    subsec_lines = subsection.split('\n')
                    subsec_title = subsec_lines[0].strip() if subsec_idx > 0 else ""
                    subsec_content = '\n'.join(subsec_lines[1:] if subsec_idx > 0 else subsec_lines)
                    
                    # Further split if still too large
                    if len(subsec_content) > 1500:
                        # Split by paragraphs or list items
                        parts = re.split(r'\n\n+', subsec_content)
                        current_chunk = ""
                        
                        for part in parts:
                            if len(current_chunk) + len(part) < 1000:
                                current_chunk += "\n\n" + part
                            else:
                                if current_chunk:
                                    chunks.append({
                                        'id': f'chunk_{chunk_id}',
                                        'text': current_chunk.strip(),
                                        'metadata': {
                                            'section': section_title,
                                            'subsection': subsec_title,
                                            'type': 'content_fragment'
                                        }
                                    })
                                    chunk_id += 1
                                current_chunk = part
                        
                        # Add remaining chunk
                        if current_chunk:
                            chunks.append({
                                'id': f'chunk_{chunk_id}',
                                'text': current_chunk.strip(),
                                'metadata': {
                                    'section': section_title,
                                    'subsection': subsec_title,
                                    'type': 'content_fragment'
                                }
                            })
                            chunk_id += 1
                    else:
                        # Add subsection as is
                        full_text = f"## {section_title}\n### {subsec_title}\n{subsec_content}" if subsec_title else f"## {section_title}\n{subsec_content}"
                        chunks.append({
                            'id': f'chunk_{chunk_id}',
                            'text': full_text.strip(),
                            'metadata': {
                                'section': section_title,
                                'subsection': subsec_title,
                                'type': 'subsection'
                            }
                        })
                        chunk_id += 1
            else:
                # Add entire section
                full_text = f"## {section_title}\n{section_content}"
                chunks.append({
                    'id': f'chunk_{chunk_id}',
                    'text': full_text.strip(),
                    'metadata': {
                        'section': section_title,
                        'subsection': '',
                        'type': 'section'
                    }
                })
                chunk_id += 1
        
        return chunks
    
    def build_database(self):
        """
        Build the vector database from the markdown file
        """
        print(f"Reading markdown file: {self.markdown_file_path}")
        
        with open(self.markdown_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("Chunking content...")
        chunks = self.chunk_markdown(content)
        print(f"Created {len(chunks)} chunks")
        
        # Clear existing data
        try:
            self.client.delete_collection("meraz_info")
            self.collection = self.client.create_collection(
                name="meraz_info",
                metadata={"description": "MERAZ 6.0 Festival Information"}
            )
            print("Cleared existing database")
        except:
            pass
        
        # Generate embeddings and add to database
        print("Generating embeddings and adding to database...")
        
        batch_size = 50
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i+batch_size]
            
            texts = [chunk['text'] for chunk in batch]
            ids = [chunk['id'] for chunk in batch]
            metadatas = [chunk['metadata'] for chunk in batch]
            
            # Generate embeddings
            embeddings = self.embedding_model.encode(texts, show_progress_bar=False)
            
            # Add to ChromaDB
            self.collection.add(
                documents=texts,
                embeddings=embeddings.tolist(),
                ids=ids,
                metadatas=metadatas
            )
            
            print(f"  Added batch {i//batch_size + 1}/{(len(chunks)-1)//batch_size + 1}")
        
        print(f"\n✓ Database built successfully!")
        print(f"  Total chunks: {len(chunks)}")
        print(f"  Database location: {self.db_path}")
    
    def search(self, query: str, n_results: int = 5) -> List[Dict]:
        """
        Search the vector database for relevant information
        
        Args:
            query: User's question or search query
            n_results: Number of results to return
            
        Returns:
            List of relevant chunks with metadata
        """
        # Generate query embedding
        query_embedding = self.embedding_model.encode([query])[0]
        
        # Search ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=n_results
        )
        
        # Format results
        formatted_results = []
        for i in range(len(results['documents'][0])):
            formatted_results.append({
                'text': results['documents'][0][i],
                'metadata': results['metadatas'][0][i],
                'distance': results['distances'][0][i] if 'distances' in results else None,
                'id': results['ids'][0][i]
            })
        
        return formatted_results
    
    def get_context_for_query(self, query: str, max_chunks: int = 3) -> str:
        """
        Get formatted context for a query to pass to the LLM
        
        Args:
            query: User's question
            max_chunks: Maximum number of chunks to include
            
        Returns:
            Formatted context string
        """
        results = self.search(query, n_results=max_chunks)
        
        context_parts = []
        for idx, result in enumerate(results, 1):
            section = result['metadata'].get('section', 'Unknown')
            subsection = result['metadata'].get('subsection', '')
            
            header = f"[Source {idx}: {section}"
            if subsection:
                header += f" > {subsection}"
            header += "]"
            
            context_parts.append(f"{header}\n{result['text']}")
        
        return "\n\n---\n\n".join(context_parts)


def main():
    """
    Main function to build the database
    """
    # Path to your markdown file
    markdown_path = "/mnt/user-data/outputs/MERAZ_6.0_INFO.md"
    
    # Initialize and build database
    db = MerazVectorDB(markdown_path)
    db.build_database()
    
    # Test queries
    print("\n" + "="*60)
    print("TESTING THE DATABASE")
    print("="*60)
    
    test_queries = [
        "When is Asees Kaur performing?",
        "What are informal events?",
        "How much does a full festival pass cost?",
        "Where is RoboSoccer held?",
        "Tell me about the pronites"
    ]
    
    for query in test_queries:
        print(f"\n\nQuery: {query}")
        print("-" * 60)
        results = db.search(query, n_results=2)
        for i, result in enumerate(results, 1):
            print(f"\nResult {i} (Section: {result['metadata']['section']}):")
            print(f"Distance: {result['distance']:.4f}")
            print(f"Text preview: {result['text'][:200]}...")


if __name__ == "__main__":
    main()
