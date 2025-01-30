# ProPulseAI - Level Supermind Hackathon Finalist

## LangFlow RAG & Chat Memory Pipeline

This repository contains a **LangFlow** pipeline demonstrating how to:
1. **Ingest a PDF File** (e.g., “The Art of Creating Ads”) and split it into text chunks.
2. **Embed & Store** these chunks in **Astra DB** as a vector database for semantic search.
3. **Retrieve** relevant text snippets via RAG (Retrieval-Augmented Generation).
4. **Use an LLM Agent** (OpenAI or other) to generate context-aware marketing strategies and answers.
5. **Maintain Chat Memory** (conversation history) in Astra DB for long-term user context.
6. Optionally perform external **Tavily AI Search** to enrich responses with real-time data.

This pipeline is ideal for marketing teams or creators who want on-demand, context-rich insights from PDFs (or other documents), combined with external data and a memory-rich chatbot experience.

---

## Table of Contents
1. [Overview of the Flow](#overview-of-the-flow)
2. [Key Nodes & Functions](#key-nodes--functions)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Configuring the Flow](#configuring-the-flow)
6. [Usage Instructions](#usage-instructions)
7. [Pipeline Walkthrough](#pipeline-walkthrough)
8. [Extending the Pipeline](#extending-the-pipeline)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview of the Flow

Below is a high-level summary of what this pipeline does:

1. **Load a PDF File** using the **File** node and convert it into text.
2. **Split** the text into chunks with the **Split Text** node for efficient embeddings.
3. **Embed & Store** these chunks in **Astra DB** (vector store) using a selected embedding model (e.g., `sentence-transformers/all-MiniLM-L6-v2`).
4. **Chat** with an AI agent who can:
   - Retrieve relevant PDF segments from the vector store (Astra DB) based on user queries.
   - Optionally leverage **Tavily AI Search** for up-to-date external info.
   - Maintain conversation context via **Astra DB Chat Memory**.
5. **Output** the AI-generated response to the user in real time.

<img width="965" alt="image" src="https://github.com/user-attachments/assets/d1718c8a-c1aa-4cda-ae10-529421dad33a" />

---

## Key Nodes & Functions

1. **Chat Input**  
   - Captures user queries from the Playground (e.g., “How do I promote my gaming product?”).

2. **File**  
   - Loads your source PDF (e.g., “The Art of Creating Ads.pdf”).

3. **Split Text**  
   - Splits the PDF text into smaller “chunks” (size configurable, default ~800 tokens/characters) to improve embedding accuracy.

4. **Astra DB (Vector Store)**  
   - Uses the supplied `ASTRA_DB_APPLICATION_TOKEN`, database, and collection to store embeddings.  
   - **Embedding Model / Astra Vectorstore**: Embeds each chunk using a Hugging Face model (e.g., `sentence-transformers/all-MiniLM-L6-v2`) for semantic search.  
   - Receives user queries to find relevant chunks (“Search Input”), returning “Search Results.”

5. **Parse Data**  
   - Converts raw data into a plain-text format following a template. This might structure search results for better readability or incorporate them into the Prompt Node.

6. **Prompt Node**  
   - Combines the user’s question, any relevant text from the vector store, and additional instructions (“You are an AI marketing strategist...”) into a final prompt.

7. **Tavily AI Search (Optional)**  
   - Provides real-time or additional search capabilities beyond the embedded PDF content.

8. **Agent**  
   - The core LLM-driven node (e.g., using OpenAI). Receives the compiled prompt, can call tools (including Tavily AI Search), and generates the final response.

9. **Astra DB Chat Memory**  
   - Stores and retrieves conversation history from an Astra DB instance, enabling the chatbot to recall previous messages across multiple turns.

10. **Message History & Store Message**  
    - Keeps an internal record of user–bot exchanges, optionally saving them to external memory (Astra DB).

11. **Chat Output**  
    - Displays the AI-generated response in the Playground.

---

## Prerequisites

1. **LangFlow** installed (version `>= 0.1.x` recommended).  
   - [LangFlow GitHub](https://github.com/logspace-ai/langflow)
2. **Python 3.9+** (recommended if installing locally).
3. **OpenAI API Key** (or other LLM provider key) if you plan to use the `Agent` node with OpenAI’s models.
4. **Astra DB** account:
   - [Sign up here](https://astra.datastax.com/) (free tier available).
   - Obtain your `ASTRA_DB_APPLICATION_TOKEN`, database name, and collection name for vector storage and/or chat memory.
5. **Tavily AI Key** (optional), if using Tavily for external web search.

---

## Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/YourUsername/langflow-rag-chat.git
   cd langflow-rag-chat
   ```

2. **Install LangFlow**  
   ```bash
   pip install langflow
   ```
   Or follow instructions on the [LangFlow GitHub](https://github.com/logspace-ai/langflow).

3. **Create & Activate a Virtual Environment** (Recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   .\venv\Scripts\activate   # Windows
   ```

4. **Install Required Dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

5. **Set Environment Variables** (see [Configuring the Flow](#configuring-the-flow)).

---

## Configuring the Flow

- **Open the LangFlow UI** by running:
  ```bash
  langflow
  ```
  It typically starts at [http://localhost:7860](http://localhost:7860).
  
- **Import the Flow**:
  1. Go to “Upload Flow” or “Import Flow.”
  2. Select the `.json` file for this pipeline (e.g. `rag_chat_flow.json`).

- **Node Configurations**:  
  - **Astra DB**:  
    - `ASTRA_DB_APPLICATION_TOKEN`: Paste your token in the node configuration.  
    - `database`: The name of your database (e.g., `RAG_DB`).  
    - `collection`: The name of your vector store collection (e.g., `ads_content`).  
  - **Agent**:  
    - `OpenAI API Key`: Enter your key for GPT-4o-mini or any other LLM provider.  
  - **Tavily AI Search** (optional):
    - Provide your `TAVILY_API_KEY` if you want real-time web searches.

- **File Node**:
  - Point it to your PDF path (e.g. `./data/The-Art-Of-Creating-Ads.pdf`).

---

## Usage Instructions

1. **Load the Flow**  
   After importing in the LangFlow UI, ensure each node is properly configured (see above).

2. **Embed Your PDF**  
   - The pipeline typically auto-ingests the PDF chunks into the Astra DB vector store when run.  
   - Check logs in the bottom “Execution” pane or terminal to confirm embeddings are created.

3. **Ask Questions**  
   - In the **Playground** tab, type your query into **Chat Input** (e.g., “What’s the best hook for gaming ads?”).
   - The pipeline will:
     1. Retrieve relevant chunks from your PDF (via vector similarity search).
     2. Parse and inject them into the prompt.
     3. (Optionally) run Tavily AI Search for extra context.
     4. Generate a final answer using the **Agent** node.
     5. Store the conversation in Astra DB Chat Memory for context in future queries.

4. **View Responses**  
   - The **Chat Output** node will display the AI’s answer.  
   - Messages are also saved by **Store Message** and **Message History**.

---

## Pipeline Walkthrough

1. **File → Split Text**  
   - Splits the PDF content into 800-character segments with a `200` overlap, ensuring no context is lost between chunks.

2. **Astra DB (Vector)**  
   - Each chunk is embedded using `sentence-transformers/all-MiniLM-L6-v2` or another Hugging Face model.  
   - Astra DB stores embeddings, enabling fast similarity searches based on user queries.

3. **Chat Input**  
   - The user types a question or statement in the Playground interface.

4. **Search Input**  
   - The user’s query is passed into Astra DB’s search to find the top relevant chunks (controlled by similarity scoring).

5. **Parse Data**  
   - Takes the returned chunks (“Search Results”) and converts them into a plain-text or structured snippet ready for the prompt.

6. **Prompt Node**  
   - Combines the user’s question, relevant chunks, and additional instructions (e.g., “You are an AI marketing strategist…”).

7. **Agent**  
   - Interprets the prompt.  
   - Optionally calls **Tavily AI Search** to enrich the answer with real-time data.  
   - Generates a final response.

8. **Message History & Astra DB Chat Memory**  
   - The conversation (user query + AI reply) is stored, allowing the model to recall and build upon prior context.

9. **Chat Output**  
   - Delivers the final text back to the Playground.

---

## Extending the Pipeline

- **Multiple PDFs**: Load several PDFs and unify them in the vector store for cross-document answers.
- **Custom Embeddings**: Swap in a different Hugging Face model if you need domain-specific embeddings (finance, legal, etc.).
- **Alternate LLMs**: Replace OpenAI with Cohere, Anthropic, or a local model by updating the Agent node’s config.
- **Advanced RAG**: Integrate summarization steps, or chain calls to produce more elaborate responses.
- **UI Integrations**: Connect this pipeline to a web application, Slack bot, or any other front-end.

---


## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this pipeline in personal or commercial projects.

---

**Happy Exploring!**  
For questions, suggestions, or deeper troubleshooting, please open an issue or start a discussion in this repo. Enjoy creating AI-driven marketing strategies with a memory-powered chatbot!
