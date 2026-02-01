"""
MERAZ Chatbot with Vector Database and Together API
Integrates ChromaDB vector search with Together API's TNG:R1T model
"""

import os
from typing import List, Dict
from meraz_vector_db import MerazVectorDB

# You'll need to install: pip install together
try:
    from together import Together
except ImportError:
    print("Please install together: pip install together")
    print("Or use requests to call the API directly")


class MerazChatbot:
    def __init__(self, api_key: str, markdown_path: str = "/mnt/user-data/outputs/MERAZ_6.0_INFO.md"):
        """
        Initialize the MERAZ chatbot
        
        Args:
            api_key: Together API key
            markdown_path: Path to MERAZ info markdown file
        """
        # Initialize vector database
        print("Initializing vector database...")
        self.vector_db = MerazVectorDB(markdown_path)
        
        # Check if database exists, if not build it
        try:
            # Test if database has data
            test_results = self.vector_db.search("test", n_results=1)
            print("✓ Vector database loaded")
        except:
            print("Building vector database (first time only)...")
            self.vector_db.build_database()
        
        # Initialize Together API
        self.client = Together(api_key=api_key)
        self.model = "meta-llama/Llama-3.3-70B-Instruct-Turbo"  # Or your TNG:R1T model
        
        print("✓ Chatbot ready!")
    
    def get_relevant_context(self, user_query: str, max_chunks: int = 3) -> str:
        """
        Retrieve relevant context from vector database
        """
        return self.vector_db.get_context_for_query(user_query, max_chunks=max_chunks)
    
    def create_prompt(self, user_query: str, context: str, conversation_history: List[Dict] = None) -> str:
        """
        Create a prompt for the LLM with context
        """
        system_prompt = """You are a helpful assistant for MERAZ 6.0, the annual techno-cultural festival of IIT Bhilai.

Your role:
- Answer questions about MERAZ 6.0 events, schedule, passes, celebrities, venues, and facilities
- Be friendly, enthusiastic, and helpful
- Use the provided context to answer accurately
- If information is in the context, cite it clearly
- If information is NOT in the context, politely say you don't have that specific information
- Keep answers concise but informative
- Use bullet points for lists when appropriate

Important:
- Festival location: IIT Bhilai, Raipur, Chhattisgarh
- Theme: Steampunk: Gears of Glory
- Duration: 3 days
- Always verify event timings and venues from the context before answering
"""

        user_prompt = f"""Based on the following information about MERAZ 6.0, please answer the user's question.

CONTEXT FROM MERAZ DATABASE:
{context}

USER QUESTION:
{user_query}

Please provide a helpful, accurate answer based on the context above. If the question asks about specific times, venues, or details, make sure to include them in your response."""

        return system_prompt, user_prompt
    
    def chat(self, user_query: str, conversation_history: List[Dict] = None, verbose: bool = False) -> str:
        """
        Main chat function - retrieves context and generates response
        
        Args:
            user_query: User's question
            conversation_history: Optional chat history
            verbose: If True, print retrieval details
            
        Returns:
            Chatbot response
        """
        # Get relevant context from vector database
        if verbose:
            print(f"\n🔍 Searching vector database for: '{user_query}'")
        
        context = self.get_relevant_context(user_query, max_chunks=3)
        
        if verbose:
            print(f"\n📚 Retrieved context ({len(context)} chars)")
            print("─" * 60)
            print(context[:300] + "..." if len(context) > 300 else context)
            print("─" * 60)
        
        # Create prompt
        system_prompt, user_prompt = self.create_prompt(user_query, context, conversation_history)
        
        # Build messages
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        # Add conversation history if provided
        if conversation_history:
            messages = [{"role": "system", "content": system_prompt}] + conversation_history + [{"role": "user", "content": user_prompt}]
        
        # Call Together API
        if verbose:
            print("\n🤖 Calling Together API...")
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=1000,
                temperature=0.7,
                top_p=0.9,
            )
            
            answer = response.choices[0].message.content
            return answer
        
        except Exception as e:
            return f"Error calling API: {str(e)}\n\nPlease check your API key and internet connection."
    
    def interactive_chat(self):
        """
        Run an interactive chat session
        """
        print("\n" + "="*60)
        print("MERAZ 6.0 CHATBOT - Interactive Mode")
        print("="*60)
        print("Ask me anything about MERAZ 6.0!")
        print("Type 'quit' or 'exit' to end the conversation")
        print("Type 'verbose' to toggle detailed output")
        print("="*60 + "\n")
        
        conversation_history = []
        verbose = False
        
        while True:
            user_input = input("\n👤 You: ").strip()
            
            if not user_input:
                continue
            
            if user_input.lower() in ['quit', 'exit', 'bye']:
                print("\n👋 Thanks for using MERAZ chatbot! See you at the festival!")
                break
            
            if user_input.lower() == 'verbose':
                verbose = not verbose
                print(f"🔧 Verbose mode: {'ON' if verbose else 'OFF'}")
                continue
            
            # Get response
            response = self.chat(user_input, conversation_history=conversation_history, verbose=verbose)
            
            print(f"\n🤖 Bot: {response}")
            
            # Update conversation history
            conversation_history.append({"role": "user", "content": user_input})
            conversation_history.append({"role": "assistant", "content": response})
            
            # Keep only last 6 messages (3 exchanges) to avoid token limits
            if len(conversation_history) > 6:
                conversation_history = conversation_history[-6:]


# Example usage with requests (if you don't want to use the Together SDK)
def chat_with_together_api_requests(user_query: str, context: str, api_key: str):
    """
    Alternative method using requests library instead of Together SDK
    """
    import requests
    
    url = "https://api.together.xyz/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    system_prompt = """You are a helpful assistant for MERAZ 6.0, the annual techno-cultural festival of IIT Bhilai. 
Answer questions based on the provided context accurately and enthusiastically."""
    
    user_prompt = f"""Context: {context}

Question: {user_query}

Please answer based on the context above."""
    
    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "max_tokens": 1000,
        "temperature": 0.7
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code} - {response.text}"


def main():
    """
    Example usage
    """
    # Get API key from environment variable or replace with your key
    api_key = os.getenv("TOGETHER_API_KEY", "your-api-key-here")
    
    if api_key == "your-api-key-here":
        print("⚠️  Please set your TOGETHER_API_KEY environment variable or replace in code")
        print("    Example: export TOGETHER_API_KEY='your-key-here'")
        return
    
    # Initialize chatbot
    chatbot = MerazChatbot(api_key=api_key)
    
    # Option 1: Interactive chat
    chatbot.interactive_chat()
    
    # Option 2: Single queries (commented out)
    # queries = [
    #     "When is Asees Kaur performing?",
    #     "What are informal events and where are they held?",
    #     "How much does a full festival pass cost?",
    #     "Tell me about the pronites",
    #     "Where is the RoboSoccer event?"
    # ]
    # 
    # for query in queries:
    #     print(f"\n\n{'='*60}")
    #     print(f"Q: {query}")
    #     print('='*60)
    #     response = chatbot.chat(query, verbose=True)
    #     print(f"\nA: {response}")


if __name__ == "__main__":
    main()
