# MERAZ 6.0 Chatbot Setup Guide

A semantic search-powered chatbot for MERAZ 6.0 using vector database and Together API.

## 🎯 Features

- **Vector Database**: Fast semantic search using ChromaDB
- **Smart Retrieval**: Automatically finds relevant information from MERAZ docs
- **Together API Integration**: Uses TNG:R1T or Llama models for natural responses
- **Conversation Memory**: Maintains chat history for context
- **Offline Embeddings**: Uses sentence-transformers (no external API needed for search)

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install chromadb sentence-transformers together requests numpy torch python-dotenv
```

### Step 2: Set Your Together API Key

**Option A: Environment Variable (Recommended)**
```bash
export TOGETHER_API_KEY='your-api-key-here'
```

Or create a `.env` file:
```
TOGETHER_API_KEY=your-api-key-here
```

**Option B: Edit the Code**
Replace `"your-api-key-here"` in `meraz_chatbot.py` with your actual API key.

### Step 3: Build the Vector Database (First Time Only)

```bash
python meraz_vector_db.py
```

This will:
- Read the MERAZ_6.0_INFO.md file
- Split it into semantic chunks
- Generate embeddings using sentence-transformers
- Store in ChromaDB (creates `./meraz_chroma_db/` directory)
- Run test queries

**Note**: This only needs to be done once. The database persists on disk.

---

## 🚀 Usage

### Interactive Chatbot

```bash
python meraz_chatbot.py
```

Example conversation:
```
👤 You: When is Asees Kaur performing?
🤖 Bot: Asees Kaur will perform on Day 3 from 8:00 PM to 9:30 PM at the Main Stage!

👤 You: What are informal events?
🤖 Bot: Informal events are fun, casual activities held throughout all 3 days at MSH Road and Near Mini Stage...
```

Commands:
- Type anything to chat
- Type `verbose` to see retrieval details (what context is being fetched)
- Type `quit` or `exit` to end

### Programmatic Usage

```python
from meraz_chatbot import MerazChatbot

# Initialize
chatbot = MerazChatbot(api_key="your-api-key")

# Single query
response = chatbot.chat("When is the fashion show?")
print(response)

# With verbose mode to see retrieval
response = chatbot.chat("What are pronites?", verbose=True)
print(response)
```

### Using Vector Database Directly

```python
from meraz_vector_db import MerazVectorDB

# Initialize
db = MerazVectorDB("/path/to/MERAZ_6.0_INFO.md")

# Search
results = db.search("When is Asees Kaur performing?", n_results=3)

for result in results:
    print(f"Section: {result['metadata']['section']}")
    print(f"Text: {result['text'][:200]}...")
    print()

# Get formatted context for LLM
context = db.get_context_for_query("pronite schedule", max_chunks=2)
print(context)
```

---

## 🔧 Configuration

### Change the LLM Model

In `meraz_chatbot.py`, modify the model:

```python
self.model = "meta-llama/Llama-3.3-70B-Instruct-Turbo"  # Current
# Or use your TNG:R1T model:
# self.model = "your-model-name-here"
```

### Adjust Retrieval Settings

```python
# Get more context chunks
context = self.get_relevant_context(user_query, max_chunks=5)  # Default: 3

# Get more search results
results = self.vector_db.search(query, n_results=10)  # Default: 5
```

### Adjust Response Generation

In `meraz_chatbot.py`:

```python
response = self.client.chat.completions.create(
    model=self.model,
    messages=messages,
    max_tokens=1000,      # Increase for longer responses
    temperature=0.7,      # 0.0 = deterministic, 1.0 = creative
    top_p=0.9,           # Nucleus sampling
)
```

---

## 📊 How It Works

### 1. Document Chunking
```
MERAZ_6.0_INFO.md
    ↓
Split by sections (##) and subsections (###)
    ↓
Create semantic chunks (500-1500 chars each)
    ↓
~50-100 chunks with metadata
```

### 2. Vector Search
```
User Query: "When is Asees Kaur performing?"
    ↓
Convert to embedding (384-dim vector)
    ↓
Search ChromaDB for similar embeddings
    ↓
Retrieve top 3 most relevant chunks
    ↓
Return context to LLM
```

### 3. Response Generation
```
Context from Vector DB
    +
System Prompt (instructions)
    +
User Query
    ↓
Together API (TNG:R1T model)
    ↓
Natural Language Response
```

---

## 🎯 Example Queries

The chatbot can answer:

**Event Timing & Location:**
- "When is RoboSoccer?"
- "Where is the fashion show held?"
- "What time does Battle of Bands start?"

**Celebrity Information:**
- "Who is performing at the pronites?"
- "Tell me about Asees Kaur"
- "When is DJ Sparsh performing?"

**Passes & Registration:**
- "How much is a full festival pass?"
- "What does the VIP pass include?"
- "Can I buy day passes?"

**Event Details:**
- "What are technical events?"
- "Tell me about informal events"
- "What sports are there?"

**Venue Information:**
- "How do I reach IIT Bhilai?"
- "Where is L104?"
- "What facilities are available?"

---

## 📁 File Structure

```
.
├── MERAZ_6.0_INFO.md          # Source markdown file
├── meraz_vector_db.py         # Vector database builder
├── meraz_chatbot.py           # Main chatbot with Together API
├── requirements.txt           # Dependencies
├── README.md                  # This file
└── meraz_chroma_db/          # ChromaDB storage (auto-created)
    ├── chroma.sqlite3
    └── ...
```

---

## 🔍 Troubleshooting

### "ModuleNotFoundError: No module named 'chromadb'"
```bash
pip install chromadb sentence-transformers together
```

### "API key not found"
Make sure you've set the TOGETHER_API_KEY:
```bash
export TOGETHER_API_KEY='your-key-here'
```

### "Database is empty"
Build the database first:
```bash
python meraz_vector_db.py
```

### Slow first run
The first time you run it:
- Downloads the embedding model (~80MB)
- Builds the vector database
- This is normal and only happens once

### Poor search results
- Rebuild database: Delete `meraz_chroma_db/` folder and run `python meraz_vector_db.py`
- Increase number of chunks: Change `max_chunks=3` to `max_chunks=5`
- Adjust chunking: Modify `chunk_markdown()` in `meraz_vector_db.py`

---

## 🚀 Advanced Usage

### Web Integration (Flask/FastAPI)

```python
from flask import Flask, request, jsonify
from meraz_chatbot import MerazChatbot

app = Flask(__name__)
chatbot = MerazChatbot(api_key="your-key")

@app.route('/chat', methods=['POST'])
def chat():
    user_query = request.json['query']
    response = chatbot.chat(user_query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
```

### Add Custom Data Sources

```python
# In meraz_vector_db.py, modify chunk_markdown()
# to handle additional markdown files or JSON data

def add_custom_data(self, custom_chunks: List[Dict]):
    """Add custom chunks to the database"""
    texts = [chunk['text'] for chunk in custom_chunks]
    ids = [chunk['id'] for chunk in custom_chunks]
    
    embeddings = self.embedding_model.encode(texts)
    
    self.collection.add(
        documents=texts,
        embeddings=embeddings.tolist(),
        ids=ids
    )
```

### Stream Responses (Real-time)

```python
# Modify chat() in meraz_chatbot.py
response = self.client.chat.completions.create(
    model=self.model,
    messages=messages,
    stream=True  # Enable streaming
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end='')
```

---

## 📈 Performance

- **Vector Search**: ~10-50ms for most queries
- **Total Response Time**: ~1-3 seconds (depends on Together API)
- **Database Size**: ~2-5MB for MERAZ docs
- **Memory Usage**: ~200-500MB (embedding model in RAM)

---

## 🤝 Contributing

To update the knowledge base:

1. Edit `MERAZ_6.0_INFO.md`
2. Rebuild database: `python meraz_vector_db.py`
3. Test: `python meraz_chatbot.py`

---

## 📝 License

This is a project for MERAZ 6.0 - IIT Bhilai's techno-cultural festival.

---

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review the code comments
- Test with `verbose=True` to see what's happening

---

## 🎉 Ready to Go!

Your MERAZ chatbot is now ready to answer questions about the festival!

```bash
python meraz_chatbot.py
```

Enjoy building your chatbot! 🚀
