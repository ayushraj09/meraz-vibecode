"""
Simple Example: MERAZ Chatbot with Together API
Shows basic integration with vector database retrieval
"""

import os
import requests
from meraz_vector_db import MerazVectorDB


def chat_with_together_api(query: str, context: str, api_key: str, model: str = "meta-llama/Llama-3.3-70B-Instruct-Turbo"):
    """
    Send a query to Together API with retrieved context
    
    Args:
        query: User's question
        context: Retrieved context from vector database
        api_key: Your Together API key
        model: Model to use (default: Llama 3.3, or use your TNG:R1T model)
    
    Returns:
        Response from the API
    """
    url = "https://api.together.xyz/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # System prompt
    system_message = """You are a helpful assistant for MERAZ 6.0, IIT Bhilai's techno-cultural festival.
Answer questions accurately based on the provided context. Be enthusiastic and friendly!"""
    
    # User message with context
    user_message = f"""Here's information about MERAZ 6.0:

{context}

Now please answer this question: {query}

Provide a clear, helpful answer based on the information above."""
    
    # API request payload
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": 512,
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stop": ["<|eot_id|>", "<|eom_id|>"]
    }
    
    # Make request
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error {response.status_code}: {response.text}"


def main():
    """
    Simple example usage
    """
    print("="*70)
    print("MERAZ 6.0 CHATBOT - Simple Example")
    print("="*70)
    
    # 1. Get API key
    api_key = os.getenv("TOGETHER_API_KEY")
    if not api_key:
        print("\n⚠️  Please set TOGETHER_API_KEY environment variable")
        print("   export TOGETHER_API_KEY='your-key-here'")
        return
    
    # 2. Initialize vector database
    print("\n📚 Loading vector database...")
    markdown_path = "/mnt/user-data/outputs/MERAZ_6.0_INFO.md"
    db = MerazVectorDB(markdown_path)
    
    # Build if not exists
    try:
        test = db.search("test", n_results=1)
        print("✓ Database loaded successfully")
    except:
        print("Building database (first time)...")
        db.build_database()
    
    # 3. Test queries
    test_queries = [
        "When is Asees Kaur performing?",
        "What are informal events?",
        "How much does a festival pass cost?",
        "Where is RoboSoccer held?",
        "Tell me about the pronites"
    ]
    
    # You can change this to your TNG:R1T model
    model = "meta-llama/Llama-3.3-70B-Instruct-Turbo"
    # model = "your-tng-r1t-model-name"  # Uncomment and add your model
    
    for query in test_queries:
        print("\n" + "="*70)
        print(f"❓ Question: {query}")
        print("="*70)
        
        # Retrieve relevant context
        print("\n🔍 Searching vector database...")
        context = db.get_context_for_query(query, max_chunks=3)
        print(f"✓ Retrieved {len(context)} characters of context")
        
        # Get response from Together API
        print("\n🤖 Generating response...")
        response = chat_with_together_api(query, context, api_key, model)
        
        print(f"\n💬 Answer:\n{response}")
        print("\n" + "-"*70)
    
    print("\n✅ Done! All queries processed successfully.")
    
    # 4. Interactive mode
    print("\n" + "="*70)
    print("Now entering interactive mode...")
    print("Type your questions (or 'quit' to exit)")
    print("="*70)
    
    while True:
        user_input = input("\n❓ Your question: ").strip()
        
        if not user_input:
            continue
        
        if user_input.lower() in ['quit', 'exit', 'q']:
            print("\n👋 Thanks for chatting! See you at MERAZ 6.0!")
            break
        
        # Get context
        context = db.get_context_for_query(user_input, max_chunks=3)
        
        # Get response
        response = chat_with_together_api(user_input, context, api_key, model)
        
        print(f"\n💬 Answer: {response}")


# Example: Using with different Together API models
def example_with_different_models():
    """
    Examples of using different Together API models
    """
    api_key = os.getenv("TOGETHER_API_KEY")
    
    # Available models on Together API:
    models = {
        "llama_3_3": "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        "llama_3_2": "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        "qwen": "Qwen/Qwen2.5-72B-Instruct-Turbo",
        "deepseek": "deepseek-ai/DeepSeek-V3",
        # Add your TNG:R1T model here:
        # "tng_r1t": "your-model-name-here"
    }
    
    db = MerazVectorDB("/mnt/user-data/outputs/MERAZ_6.0_INFO.md")
    
    query = "When is Asees Kaur performing?"
    context = db.get_context_for_query(query, max_chunks=2)
    
    for name, model in models.items():
        print(f"\n{'='*60}")
        print(f"Testing with {name}: {model}")
        print('='*60)
        
        try:
            response = chat_with_together_api(query, context, api_key, model)
            print(f"Response: {response}")
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()
    
    # Uncomment to test different models:
    # example_with_different_models()
