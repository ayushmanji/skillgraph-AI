export interface SeedSkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'DevOps & Cloud' | 'Data Engineering' | 'Database' | 'Architecture' | 'General';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  requires?: string[]; // IDs of prerequisite skills
  relatedTo?: string[]; // IDs of related skills
}

export interface SeedTechnology {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface SeedFramework {
  id: string;
  name: string;
  ecosystem: string;
  usesTechId: string;
  description: string;
}

export interface SeedRole {
  id: string;
  name: string;
  description: string;
  requiredSkillIds: string[];
  averageSalary: string;
  demandLevel: 'High' | 'Very High' | 'Moderate';
}

export interface SeedProject {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  buildsSkillIds: string[];
  usesTechIds: string[];
  prerequisiteSkillIds: string[];
}

export interface SeedResource {
  id: string;
  name: string;
  url: string;
  typeFormat: 'Course' | 'Documentation' | 'Video' | 'Book' | 'Interactive';
  rating: number;
  duration: string;
  teachesSkillId: string;
}

// 80+ SKILLS
export const SKILLS: SeedSkill[] = [
  // Frontend
  { id: 'html5', name: 'HTML5', category: 'Frontend', level: 'Beginner', description: 'Semantic structure and Web APIs' },
  { id: 'css3', name: 'CSS3', category: 'Frontend', level: 'Beginner', description: 'Styling, Flexbox, Grid and CSS Animations', requires: ['html5'] },
  { id: 'javascript', name: 'JavaScript ES6+', category: 'Frontend', level: 'Beginner', description: 'Core web scripting, async/await, closures', requires: ['html5', 'css3'] },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', level: 'Intermediate', description: 'Static typing, generics, strict type safety', requires: ['javascript'] },
  { id: 'react', name: 'React', category: 'Frontend', level: 'Intermediate', description: 'Component architecture, hooks, Virtual DOM', requires: ['javascript', 'css3'], relatedTo: ['vue', 'svelte'] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', level: 'Advanced', description: 'App Router, SSR, SSG, Server Components', requires: ['react', 'typescript'] },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'Frontend', level: 'Intermediate', description: 'Utility-first CSS styling and custom design tokens', requires: ['css3'] },
  { id: 'state-mgmt', name: 'State Management', category: 'Frontend', level: 'Intermediate', description: 'Redux Toolkit, Zustand, Context API', requires: ['react'] },
  { id: 'tanstack-query', name: 'TanStack Query', category: 'Frontend', level: 'Intermediate', description: 'Server state management, caching, optimistic updates', requires: ['react'] },
  { id: 'web-perf', name: 'Web Performance', category: 'Frontend', level: 'Advanced', description: 'Lighthouse, Core Web Vitals, Code Splitting', requires: ['nextjs', 'react'] },
  { id: 'webassembly', name: 'WebAssembly (Wasm)', category: 'Frontend', level: 'Advanced', description: 'High performance browser code execution', requires: ['javascript'] },
  { id: 'microfrontends', name: 'Micro-Frontends', category: 'Frontend', level: 'Advanced', description: 'Module Federation, distributed frontend architecture', requires: ['nextjs'] },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend', level: 'Intermediate', description: 'Event loop, asynchronous I/O,Streams', requires: ['javascript'] },
  { id: 'express', name: 'Express.js', category: 'Backend', level: 'Intermediate', description: 'RESTful API routing, middleware pattern', requires: ['nodejs'] },
  { id: 'nestjs', name: 'NestJS', category: 'Backend', level: 'Advanced', description: 'Enterprise Node.js framework with Dependency Injection', requires: ['express', 'typescript'] },
  { id: 'python-lang', name: 'Python', category: 'Backend', level: 'Beginner', description: 'General purpose language for backend, scripts, AI', relatedTo: ['javascript'] },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', level: 'Intermediate', description: 'Modern high-performance Python web APIs with Pydantic', requires: ['python-lang'] },
  { id: 'django', name: 'Django', category: 'Backend', level: 'Intermediate', description: 'Full-featured Python web framework', requires: ['python-lang'] },
  { id: 'java-lang', name: 'Java', category: 'Backend', level: 'Intermediate', description: 'Object oriented enterprise programming', relatedTo: ['csharp'] },
  { id: 'spring-boot', name: 'Spring Boot', category: 'Backend', level: 'Advanced', description: 'Microservice creation with Java enterprise ecosystem', requires: ['java-lang'] },
  { id: 'golang', name: 'Go (Golang)', category: 'Backend', level: 'Intermediate', description: 'Concurrent, high performance compiled backend code', relatedTo: ['rust-lang'] },
  { id: 'rust-lang', name: 'Rust', category: 'Backend', level: 'Advanced', description: 'Memory safe systems programming without GC', requires: ['golang'] },
  { id: 'graphql', name: 'GraphQL', category: 'Backend', level: 'Intermediate', description: 'Declarative schema-driven API queries', requires: ['nodejs'] },
  { id: 'gRPC', name: 'gRPC & Protobuf', category: 'Backend', level: 'Advanced', description: 'High speed RPC microservice communications', requires: ['nodejs', 'golang'] },
  { id: 'websockets', name: 'WebSockets & Socket.io', category: 'Backend', level: 'Intermediate', description: 'Real-time bidirectional event streaming', requires: ['nodejs'] },

  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', level: 'Intermediate', description: 'ACID compliant relational database, indexing, JSONB', requires: ['sql'] },
  { id: 'sql', name: 'SQL Querying & Data Modeling', category: 'Database', level: 'Beginner', description: 'Joins, aggregations, schema normalization' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', level: 'Intermediate', description: 'NoSQL document database, aggregation pipelines', requires: ['javascript'] },
  { id: 'redis', name: 'Redis', category: 'Database', level: 'Intermediate', description: 'In-memory cache, pub/sub, rate limiting', requires: ['sql'] },
  { id: 'neo4j', name: 'Neo4j & Cypher', category: 'Database', level: 'Advanced', description: 'Graph database traversals, shortest path, pattern matching', requires: ['sql'], relatedTo: ['vector-db'] },
  { id: 'vector-db', name: 'Vector DBs (Pinecone/Chroma)', category: 'Database', level: 'Advanced', description: 'Embeddings storage, similarity search, HNSW indexing', requires: ['neo4j'] },
  { id: 'cassandra', name: 'Apache Cassandra', category: 'Database', level: 'Advanced', description: 'Wide-column distributed NoSQL database', requires: ['sql'] },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Database', level: 'Intermediate', description: 'Full-text search engine, BM25 ranking, inversed index', requires: ['sql'] },

  // AI & ML
  { id: 'machine-learning', name: 'Machine Learning Fundamentals', category: 'AI & ML', level: 'Intermediate', description: 'Supervised, unsupervised learning, evaluation metrics', requires: ['python-lang'] },
  { id: 'deep-learning', name: 'Deep Learning & Neural Networks', category: 'AI & ML', level: 'Advanced', description: 'CNNs, RNNs, Backpropagation, Gradient Descent', requires: ['machine-learning'] },
  { id: 'pytorch', name: 'PyTorch', category: 'AI & ML', level: 'Advanced', description: 'Tensor operations, dynamic computation graphs', requires: ['deep-learning'] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI & ML', level: 'Advanced', description: 'Enterprise neural network training and deployment', requires: ['deep-learning'] },
  { id: 'nlp', name: 'Natural Language Processing', category: 'AI & ML', level: 'Advanced', description: 'Tokenization, embeddings, sentiment analysis', requires: ['machine-learning'] },
  { id: 'transformers', name: 'Hugging Face Transformers', category: 'AI & ML', level: 'Advanced', description: 'BERT, GPT, Attention mechanisms', requires: ['nlp', 'pytorch'] },
  { id: 'langchain', name: 'LangChain & LlamaIndex', category: 'AI & ML', level: 'Advanced', description: 'LLM orchestration, tools, memory, multi-agent frameworks', requires: ['python-lang', 'transformers'] },
  { id: 'rag-arch', name: 'RAG Architecture', category: 'AI & ML', level: 'Advanced', description: 'Retrieval Augmented Generation with vector search', requires: ['vector-db', 'langchain'] },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'AI & ML', level: 'Beginner', description: 'Few-shot prompting, Chain of Thought, Guardrails' },
  { id: 'fine-tuning', name: 'LLM Fine-Tuning (LoRA/PEFT)', category: 'AI & ML', level: 'Advanced', description: 'Parameter efficient model adaptations', requires: ['transformers'] },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker & Containerization', category: 'DevOps & Cloud', level: 'Intermediate', description: 'Containers, Multi-stage builds, Docker Compose', requires: ['linux-cli'] },
  { id: 'linux-cli', name: 'Linux Administration & Bash', category: 'DevOps & Cloud', level: 'Beginner', description: 'Shell scripting, permissions, systemctl, networking' },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'DevOps & Cloud', level: 'Advanced', description: 'Container orchestration, Pods, Deployments, Ingress', requires: ['docker'] },
  { id: 'aws', name: 'AWS Cloud Architecture', category: 'DevOps & Cloud', level: 'Intermediate', description: 'EC2, S3, Lambda, IAM, VPC, DynamoDB', requires: ['linux-cli'] },
  { id: 'gcp', name: 'Google Cloud Platform (GCP)', category: 'DevOps & Cloud', level: 'Intermediate', description: 'GKE, BigQuery, Cloud Run, IAM', requires: ['aws'] },
  { id: 'terraform', name: 'Terraform (IaC)', category: 'DevOps & Cloud', level: 'Advanced', description: 'Infrastructure as Code, state management, modules', requires: ['aws'] },
  { id: 'cicd', name: 'CI/CD Pipelines', category: 'DevOps & Cloud', level: 'Intermediate', description: 'GitHub Actions, GitLab CI, automated testing', requires: ['docker'] },
  { id: 'prometheus-grafana', name: 'Monitoring (Prometheus & Grafana)', category: 'DevOps & Cloud', level: 'Intermediate', description: 'Metrics collection, alerting, dashboard observability', requires: ['kubernetes'] },
  { id: 'nginx', name: 'Nginx & Reverse Proxies', category: 'DevOps & Cloud', level: 'Intermediate', description: 'Load balancing, TLS termination, static serving', requires: ['linux-cli'] },
  { id: 'helm', name: 'Helm Package Manager', category: 'DevOps & Cloud', level: 'Advanced', description: 'Kubernetes chart templating and deployments', requires: ['kubernetes'] },

  // Data Engineering
  { id: 'data-pipelines', name: 'Data Pipeline Engineering', category: 'Data Engineering', level: 'Intermediate', description: 'ETL/ELT workflows, data validation', requires: ['python-lang', 'sql'] },
  { id: 'apache-spark', name: 'Apache Spark', category: 'Data Engineering', level: 'Advanced', description: 'Distributed big data processing, PySpark', requires: ['data-pipelines'] },
  { id: 'apache-kafka', name: 'Apache Kafka', category: 'Data Engineering', level: 'Advanced', description: 'Distributed event streaming, consumer groups', requires: ['data-pipelines'] },
  { id: 'airflow', name: 'Apache Airflow', category: 'Data Engineering', level: 'Intermediate', description: 'DAG workflow scheduling and orchestration', requires: ['data-pipelines'] },
  { id: 'dbt', name: 'dbt (Data Build Tool)', category: 'Data Engineering', level: 'Intermediate', description: 'SQL transformation pipelines inside data warehouses', requires: ['sql'] },
  { id: 'snowflake', name: 'Snowflake', category: 'Data Engineering', level: 'Intermediate', description: 'Cloud data warehousing and analytics', requires: ['sql'] },

  // Architecture & General
  { id: 'system-design', name: 'System Design', category: 'Architecture', level: 'Advanced', description: 'Scalability, caching, CAP theorem, load balancing', requires: ['postgresql', 'redis'] },
  { id: 'microservices', name: 'Microservices Architecture', category: 'Architecture', level: 'Advanced', description: 'Domain-driven design, API gateways, event sourcing', requires: ['system-design'] },
  { id: 'design-patterns', name: 'Design Patterns & Clean Code', category: 'Architecture', level: 'Intermediate', description: 'SOLID principles, Factory, Singleton, Observer' },
  { id: 'testing-unit', name: 'Unit & Integration Testing', category: 'General', level: 'Intermediate', description: 'Jest, Vitest, PyTest, mock objects', requires: ['javascript'] },
  { id: 'git', name: 'Git & Version Control', category: 'General', level: 'Beginner', description: 'Branching strategies, interactive rebase, pull requests' },

  // Extra specialized skills
  { id: 'vue', name: 'Vue.js', category: 'Frontend', level: 'Intermediate', description: 'Reactivity, Composition API', requires: ['javascript'] },
  { id: 'svelte', name: 'Svelte & SvelteKit', category: 'Frontend', level: 'Intermediate', description: 'No-virtual-DOM compile time reactivity', requires: ['javascript'] },
  { id: 'csharp', name: 'C# & .NET Core', category: 'Backend', level: 'Intermediate', description: 'Enterprise Windows/Cross-platform ecosystem', requires: ['sql'] },
  { id: 'flutter', name: 'Flutter & Dart', category: 'Frontend', level: 'Intermediate', description: 'Cross-platform mobile apps for iOS and Android', requires: ['javascript'] },
  { id: 'react-native', name: 'React Native', category: 'Frontend', level: 'Intermediate', description: 'Mobile app development with React', requires: ['react'] },
  { id: 'pwa', name: 'Progressive Web Apps (PWA)', category: 'Frontend', level: 'Intermediate', description: 'Service Workers, offline storage, web manifests', requires: ['javascript'] },
  { id: 'web-security', name: 'Web Application Security', category: 'Architecture', level: 'Advanced', description: 'OWASP Top 10, OAuth2, JWT, CORS, XSS, CSRF mitigation', requires: ['express'] },
  { id: 'event-driven', name: 'Event-Driven Architecture', category: 'Architecture', level: 'Advanced', description: 'Pub/Sub messaging, RabbitMQ, SQS', requires: ['microservices'] },
  { id: 'opencv', name: 'OpenCV & Computer Vision', category: 'AI & ML', level: 'Intermediate', description: 'Image processing, object detection', requires: ['python-lang'] },
  { id: 'pytorch-lightning', name: 'PyTorch Lightning', category: 'AI & ML', level: 'Advanced', description: 'Structured PyTorch code for research', requires: ['pytorch'] },
  { id: 'mlops', name: 'MLOps & Model Deployment', category: 'AI & ML', level: 'Advanced', description: 'MLflow, Kubeflow, model registries, monitoring', requires: ['machine-learning', 'docker'] },
  { id: 'serverless', name: 'Serverless Architecture', category: 'DevOps & Cloud', level: 'Intermediate', description: 'AWS Lambda, Vercel Functions, event triggers', requires: ['aws'] },
  { id: 'prisma', name: 'Prisma ORM', category: 'Database', level: 'Intermediate', description: 'Type-safe database ORM for TypeScript', requires: ['postgresql', 'typescript'] },
  { id: 'drizzle', name: 'Drizzle ORM', category: 'Database', level: 'Intermediate', description: 'Lightweight SQL-like ORM for TypeScript', requires: ['postgresql', 'typescript'] },
  { id: 'graphql-apollo', name: 'Apollo GraphQL Server', category: 'Backend', level: 'Intermediate', description: 'GraphQL server implementation, resolvers', requires: ['graphql'] },
  { id: 'trpc', name: 'tRPC', category: 'Backend', level: 'Intermediate', description: 'End-to-end type safe APIs without code generation', requires: ['typescript', 'react'] }
];

// 30 TECHNOLOGIES
export const TECHNOLOGIES: SeedTechnology[] = [
  { id: 'tech-js', name: 'JavaScript', category: 'Programming Language', description: 'The web scripting standard' },
  { id: 'tech-ts', name: 'TypeScript', category: 'Programming Language', description: 'Typed JS superset' },
  { id: 'tech-py', name: 'Python', category: 'Programming Language', description: 'Versatile scripting and AI language' },
  { id: 'tech-java', name: 'Java', category: 'Programming Language', description: 'JVM Enterprise language' },
  { id: 'tech-go', name: 'Go', category: 'Programming Language', description: 'High concurrency language by Google' },
  { id: 'tech-rust', name: 'Rust', category: 'Programming Language', description: 'Systems programming with ownership memory model' },
  { id: 'tech-sql', name: 'SQL', category: 'Database Language', description: 'Structured Query Language' },
  { id: 'tech-cypher', name: 'Cypher', category: 'Query Language', description: 'Declarative graph query language' },
  { id: 'tech-html', name: 'HTML5', category: 'Markup', description: 'HyperText Markup Language' },
  { id: 'tech-css', name: 'CSS3', category: 'Styling', description: 'Cascading Style Sheets' },
  { id: 'tech-docker', name: 'Docker Engine', category: 'Containerization', description: 'OS level virtualization' },
  { id: 'tech-k8s', name: 'Kubernetes', category: 'Orchestration', description: 'Container cluster management' },
  { id: 'tech-aws', name: 'AWS Infrastructure', category: 'Cloud Provider', description: 'Amazon Web Services platform' },
  { id: 'tech-gcp', name: 'Google Cloud Platform', category: 'Cloud Provider', description: 'Google cloud computing services' },
  { id: 'tech-postgres', name: 'PostgreSQL Engine', category: 'Database', description: 'Relational database engine' },
  { id: 'tech-mongodb', name: 'MongoDB Server', category: 'Database', description: 'Document storage engine' },
  { id: 'tech-redis', name: 'Redis Key-Value', category: 'Cache', description: 'In-memory data structure store' },
  { id: 'tech-kafka', name: 'Kafka Cluster', category: 'Streaming', description: 'Distributed event log' },
  { id: 'tech-wasm', name: 'WebAssembly Binary', category: 'Runtime', description: 'Low-level bytecode for web' },
  { id: 'tech-linux', name: 'Linux Kernel', category: 'OS', description: 'Open source operating system' },
  { id: 'tech-graphql', name: 'GraphQL Protocol', category: 'API Protocol', description: 'Schema query protocol' },
  { id: 'tech-grpc', name: 'gRPC Protocol', category: 'RPC Protocol', description: 'HTTP/2 protocol buffer transport' },
  { id: 'tech-git', name: 'Git Core', category: 'VCS', description: 'Distributed version control' },
  { id: 'tech-pinecone', name: 'Pinecone Vector DB', category: 'Vector Search', description: 'Managed vector database' },
  { id: 'tech-terraform', name: 'HCL (HashiCorp Language)', category: 'IaC', description: 'Infrastructure configuration' },
  { id: 'tech-spark', name: 'Spark Core Engine', category: 'Big Data', description: 'In-memory data processing' },
  { id: 'tech-neo4j', name: 'Neo4j Graph Database', category: 'Graph DB', description: 'Native graph storage engine' },
  { id: 'tech-nginx', name: 'Nginx Web Server', category: 'Web Server', description: 'High performance proxy' },
  { id: 'tech-elasticsearch', name: 'Elasticsearch Index', category: 'Search Engine', description: 'Lucene full-text index' },
  { id: 'tech-onnx', name: 'ONNX Runtime', category: 'AI Inference', description: 'Open Neural Network Exchange' }
];

// 25 FRAMEWORKS
export const FRAMEWORKS: SeedFramework[] = [
  { id: 'fw-react', name: 'React UI Library', ecosystem: 'JavaScript', usesTechId: 'tech-js', description: 'Declarative component renderer' },
  { id: 'fw-nextjs', name: 'Next.js Framework', ecosystem: 'React/TS', usesTechId: 'tech-ts', description: 'Fullstack React production framework' },
  { id: 'fw-vue', name: 'Vue Framework', ecosystem: 'JavaScript', usesTechId: 'tech-js', description: 'Progressive JS framework' },
  { id: 'fw-express', name: 'Express Backend Framework', ecosystem: 'Node.js', usesTechId: 'tech-js', description: 'Minimalist web framework' },
  { id: 'fw-nestjs', name: 'NestJS Framework', ecosystem: 'Node.js', usesTechId: 'tech-ts', description: 'Architected Node.js server framework' },
  { id: 'fw-fastapi', name: 'FastAPI Framework', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Async Python micro-framework' },
  { id: 'fw-django', name: 'Django Framework', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Batteries-included web framework' },
  { id: 'fw-springboot', name: 'Spring Boot', ecosystem: 'Java', usesTechId: 'tech-java', description: 'Java microservice framework' },
  { id: 'fw-pytorch', name: 'PyTorch Deep Learning', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Tensor and deep learning framework' },
  { id: 'fw-tensorflow', name: 'TensorFlow Library', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Machine learning framework' },
  { id: 'fw-langchain', name: 'LangChain Framework', ecosystem: 'Python/TS', usesTechId: 'tech-py', description: 'LLM application builder' },
  { id: 'fw-tailwindcss', name: 'Tailwind CSS', ecosystem: 'CSS', usesTechId: 'tech-css', description: 'Utility CSS library' },
  { id: 'fw-prisma', name: 'Prisma ORM', ecosystem: 'Node.js', usesTechId: 'tech-ts', description: 'Type-safe database client' },
  { id: 'fw-drizzle', name: 'Drizzle ORM', ecosystem: 'Node.js', usesTechId: 'tech-ts', description: 'Lightweight TS ORM' },
  { id: 'fw-trpc', name: 'tRPC Library', ecosystem: 'TypeScript', usesTechId: 'tech-ts', description: 'End-to-end type safe routing' },
  { id: 'fw-gin', name: 'Gin Web Framework', ecosystem: 'Go', usesTechId: 'tech-go', description: 'High speed Go web framework' },
  { id: 'fw-actix', name: 'Actix Web', ecosystem: 'Rust', usesTechId: 'tech-rust', description: 'Ultra fast Rust HTTP server' },
  { id: 'fw-flutter', name: 'Flutter SDK', ecosystem: 'Dart', usesTechId: 'tech-js', description: 'Cross platform UI toolkit' },
  { id: 'fw-react-native', name: 'React Native', ecosystem: 'React', usesTechId: 'tech-js', description: 'Native mobile app renderer' },
  { id: 'fw-astro', name: 'Astro Web Framework', ecosystem: 'JavaScript', usesTechId: 'tech-ts', description: 'Content-driven island architecture' },
  { id: 'fw-remix', name: 'Remix Run Framework', ecosystem: 'React', usesTechId: 'tech-ts', description: 'Fullstack web standards framework' },
  { id: 'fw-huggingface', name: 'Hugging Face Transformers', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Pre-trained NLP model repository' },
  { id: 'fw-airflow', name: 'Apache Airflow', ecosystem: 'Python', usesTechId: 'tech-py', description: 'Workflow orchestrator' },
  { id: 'fw-dbt', name: 'dbt Core', ecosystem: 'SQL', usesTechId: 'tech-sql', description: 'Data transformation framework' },
  { id: 'fw-vitest', name: 'Vitest Test Runner', ecosystem: 'Vite', usesTechId: 'tech-ts', description: 'Blazing fast test framework' }
];

// 20 ROLES
export const ROLES: SeedRole[] = [
  {
    id: 'role-fullstack',
    name: 'Full Stack Engineer',
    description: 'Builds end-to-end web applications, handling responsive client UIs, REST/GraphQL APIs, database models, and cloud deployments.',
    requiredSkillIds: ['html5', 'css3', 'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'express', 'postgresql', 'docker'],
    averageSalary: '$120,000 - $160,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-frontend',
    name: 'Senior Frontend Engineer',
    description: 'Specializes in high performance client applications, responsive UI architecture, complex state management, and web performance optimization.',
    requiredSkillIds: ['html5', 'css3', 'javascript', 'typescript', 'react', 'nextjs', 'tailwindcss', 'state-mgmt', 'tanstack-query', 'web-perf'],
    averageSalary: '$115,000 - $155,000',
    demandLevel: 'High'
  },
  {
    id: 'role-backend',
    name: 'Backend Systems Engineer',
    description: 'Designs resilient server microservices, relational and NoSQL databases, caching strategies, and high-throughput API endpoints.',
    requiredSkillIds: ['javascript', 'typescript', 'nodejs', 'express', 'postgresql', 'redis', 'docker', 'system-design', 'microservices', 'git'],
    averageSalary: '$125,000 - $165,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-ai-engineer',
    name: 'AI & LLM Application Engineer',
    description: 'Integrates Large Language Models, RAG pipelines, vector search databases, and neural networks into product workflows.',
    requiredSkillIds: ['python-lang', 'fastapi', 'machine-learning', 'transformers', 'langchain', 'vector-db', 'rag-arch', 'prompt-eng', 'neo4j'],
    averageSalary: '$140,000 - $190,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-devops',
    name: 'DevOps & Platform Engineer',
    description: 'Automates cloud infrastructure provisioning, CI/CD deployment pipelines, container orchestration with Kubernetes, and system monitoring.',
    requiredSkillIds: ['linux-cli', 'docker', 'kubernetes', 'aws', 'terraform', 'cicd', 'prometheus-grafana', 'nginx', 'git'],
    averageSalary: '$130,000 - $175,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-data-engineer',
    name: 'Data Pipeline Engineer',
    description: 'Constructs scalable ETL/ELT pipelines, streaming event architectures, data warehouses, and data quality validation systems.',
    requiredSkillIds: ['python-lang', 'sql', 'postgresql', 'data-pipelines', 'apache-spark', 'apache-kafka', 'airflow', 'dbt', 'snowflake'],
    averageSalary: '$125,000 - $170,000',
    demandLevel: 'High'
  },
  {
    id: 'role-cloud-architect',
    name: 'Cloud Solutions Architect',
    description: 'Architects multi-region cloud environments, security governance, high-availability microservices, and cost optimization.',
    requiredSkillIds: ['aws', 'gcp', 'terraform', 'kubernetes', 'system-design', 'microservices', 'web-security', 'docker'],
    averageSalary: '$150,000 - $210,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-mlops',
    name: 'MLOps Engineer',
    description: 'Bridges machine learning research and production systems, managing model training pipelines, versioning, automated deployment, and monitoring.',
    requiredSkillIds: ['python-lang', 'pytorch', 'mlops', 'docker', 'kubernetes', 'cicd', 'aws', 'machine-learning'],
    averageSalary: '$135,000 - $185,000',
    demandLevel: 'High'
  },
  {
    id: 'role-graph-architect',
    name: 'Graph Database & Knowledge Graph Engineer',
    description: 'Builds graph-native data structures, Cypher query optimization, connected data analysis, and ontology mapping.',
    requiredSkillIds: ['neo4j', 'sql', 'python-lang', 'typescript', 'system-design', 'vector-db', 'rag-arch'],
    averageSalary: '$130,000 - $180,000',
    demandLevel: 'High'
  },
  {
    id: 'role-mobile-developer',
    name: 'Mobile App Developer',
    description: 'Develops iOS and Android mobile apps using React Native or Flutter, handling native modules, offline sync, and app store deployment.',
    requiredSkillIds: ['javascript', 'typescript', 'react', 'react-native', 'state-mgmt', 'testing-unit', 'git'],
    averageSalary: '$110,000 - $150,000',
    demandLevel: 'Moderate'
  },
  {
    id: 'role-security-engineer',
    name: 'Web Security Engineer',
    description: 'Protects enterprise web apps, performing penetration testing, security auditing, identity management, and hardening cloud pipelines.',
    requiredSkillIds: ['web-security', 'linux-cli', 'docker', 'aws', 'python-lang', 'networking', 'system-design'],
    averageSalary: '$135,000 - $185,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-site-reliability',
    name: 'Site Reliability Engineer (SRE)',
    description: 'Ensures system uptime, automated disaster recovery, incident response, SLIs/SLOs management, and infrastructure resilience.',
    requiredSkillIds: ['linux-cli', 'golang', 'docker', 'kubernetes', 'prometheus-grafana', 'terraform', 'aws', 'cicd'],
    averageSalary: '$140,000 - $190,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-java-enterprise',
    name: 'Java Enterprise Engineer',
    description: 'Builds enterprise banking and core business backend microservices using Spring Boot, Hibernate, Kafka, and PostgreSQL.',
    requiredSkillIds: ['java-lang', 'spring-boot', 'sql', 'postgresql', 'apache-kafka', 'docker', 'microservices', 'system-design'],
    averageSalary: '$120,000 - $160,000',
    demandLevel: 'Moderate'
  },
  {
    id: 'role-python-backend',
    name: 'Python Backend Developer',
    description: 'Develops RESTful APIs and asynchronous background processing services using FastAPI, Celery, Redis, and PostgreSQL.',
    requiredSkillIds: ['python-lang', 'fastapi', 'django', 'postgresql', 'redis', 'docker', 'testing-unit', 'git'],
    averageSalary: '$115,000 - $155,000',
    demandLevel: 'High'
  },
  {
    id: 'role-react-architect',
    name: 'React Frontend Architect',
    description: 'Defines frontend design systems, micro-frontends, component libraries, state management, and build tool chains.',
    requiredSkillIds: ['typescript', 'react', 'nextjs', 'tailwindcss', 'microfrontends', 'web-perf', 'tanstack-query', 'state-mgmt'],
    averageSalary: '$135,000 - $180,000',
    demandLevel: 'High'
  },
  {
    id: 'role-distributed-systems',
    name: 'Distributed Systems Engineer',
    description: 'Engineers high-concurrency low-latency network engines, consensus algorithms, custom databases, and messaging brokers.',
    requiredSkillIds: ['golang', 'rust-lang', 'gRPC', 'redis', 'apache-kafka', 'system-design', 'microservices', 'linux-cli'],
    averageSalary: '$145,000 - $200,000',
    demandLevel: 'Very High'
  },
  {
    id: 'role-data-scientist',
    name: 'Data Scientist',
    description: 'Extracts actionable insights from business data using statistical models, machine learning algorithms, and visualization tools.',
    requiredSkillIds: ['python-lang', 'sql', 'machine-learning', 'deep-learning', 'nlp', 'git'],
    averageSalary: '$120,000 - $165,000',
    demandLevel: 'Moderate'
  },
  {
    id: 'role-ui-engineer',
    name: 'UI Developer & Web Designer',
    description: 'Crafts responsive interfaces, accessible components, visual animations, and CSS design tokens.',
    requiredSkillIds: ['html5', 'css3', 'javascript', 'react', 'tailwindcss', 'web-perf'],
    averageSalary: '$95,000 - $135,000',
    demandLevel: 'Moderate'
  },
  {
    id: 'role-api-engineer',
    name: 'API Platform Engineer',
    description: 'Designs corporate API gateways, developer portals, GraphQL federations, and public RESTful endpoints.',
    requiredSkillIds: ['typescript', 'nodejs', 'express', 'graphql', 'gRPC', 'web-security', 'redis', 'docker'],
    averageSalary: '$125,000 - $165,000',
    demandLevel: 'High'
  },
  {
    id: 'role-solopreneur',
    name: 'Indie Hacker / Solo Product Developer',
    description: 'Launches complete web SaaS MVPs single-handedly, covering fullstack development, AI integrations, deployment, and database setup.',
    requiredSkillIds: ['nextjs', 'typescript', 'tailwindcss', 'nodejs', 'postgresql', 'prisma', 'docker', 'aws', 'prompt-eng'],
    averageSalary: '$90,000 - $250,000+',
    demandLevel: 'High'
  }
];

// 40 PROJECTS
export const PROJECTS: SeedProject[] = [
  {
    id: 'proj-skillgraph-ai',
    name: 'SkillGraph AI - Graph Learning Platform',
    description: 'Fullstack application using Neo4j graph traversal Cypher queries to compute optimal skill learning roadmaps and role matches.',
    difficulty: 'Advanced',
    estimatedHours: 40,
    buildsSkillIds: ['neo4j', 'nextjs', 'react', 'typescript', 'nodejs', 'express', 'tailwindcss'],
    usesTechIds: ['tech-ts', 'tech-cypher', 'tech-js', 'tech-neo4j'],
    prerequisiteSkillIds: ['react', 'typescript', 'nodejs']
  },
  {
    id: 'proj-rag-knowledgebase',
    name: 'AI Vector RAG Document Chatbot',
    description: 'Build a document Q&A assistant using LangChain, OpenAI embeddings, Pinecone Vector DB, and FastAPI backend.',
    difficulty: 'Advanced',
    estimatedHours: 30,
    buildsSkillIds: ['langchain', 'rag-arch', 'vector-db', 'fastapi', 'python-lang'],
    usesTechIds: ['tech-py', 'tech-pinecone'],
    prerequisiteSkillIds: ['python-lang', 'fastapi']
  },
  {
    id: 'proj-ecommerce-microservices',
    name: 'E-Commerce Microservices Cluster',
    description: 'Containerized e-commerce backend with separate services for products, orders, and authentication communicating via gRPC and Kafka.',
    difficulty: 'Advanced',
    estimatedHours: 50,
    buildsSkillIds: ['microservices', 'gRPC', 'apache-kafka', 'docker', 'kubernetes', 'postgresql', 'redis'],
    usesTechIds: ['tech-go', 'tech-docker', 'tech-k8s', 'tech-postgres'],
    prerequisiteSkillIds: ['docker', 'postgresql', 'express']
  },
  {
    id: 'proj-kanban-saas',
    name: 'Real-time Collaborative Kanban Board',
    description: 'Trello-like drag-and-drop task board with WebSockets real-time sync, optimism updates, and Prisma ORM storage.',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    buildsSkillIds: ['react', 'nextjs', 'websockets', 'prisma', 'postgresql', 'tanstack-query'],
    usesTechIds: ['tech-ts', 'tech-postgres'],
    prerequisiteSkillIds: ['react', 'javascript']
  },
  {
    id: 'proj-gitops-k8s',
    name: 'GitOps Continuous Deployment Pipeline',
    description: 'Setup an automated deployment pipeline to Kubernetes using GitHub Actions, Helm charts, and Terraform IaC on AWS.',
    difficulty: 'Advanced',
    estimatedHours: 35,
    buildsSkillIds: ['kubernetes', 'helm', 'terraform', 'aws', 'cicd', 'docker'],
    usesTechIds: ['tech-k8s', 'tech-docker', 'tech-terraform', 'tech-aws'],
    prerequisiteSkillIds: ['docker', 'linux-cli']
  },
  {
    id: 'proj-graphql-social',
    name: 'Fullstack GraphQL Social Feed',
    description: 'Social networking platform with Apollo GraphQL Server, caching via Redis, and subscriptions for real-time notifications.',
    difficulty: 'Intermediate',
    estimatedHours: 30,
    buildsSkillIds: ['graphql', 'graphql-apollo', 'nodejs', 'redis', 'mongodb', 'typescript'],
    usesTechIds: ['tech-ts', 'tech-graphql', 'tech-redis', 'tech-mongodb'],
    prerequisiteSkillIds: ['nodejs', 'express']
  },
  {
    id: 'proj-prompt-eval-hub',
    name: 'Prompt Engineering & Benchmark Hub',
    description: 'Web dashboard to test, rate, and fine-tune prompt templates across multiple LLM providers with automatic grading.',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    buildsSkillIds: ['prompt-eng', 'react', 'fastapi', 'python-lang', 'tailwindcss'],
    usesTechIds: ['tech-py', 'tech-ts'],
    prerequisiteSkillIds: ['python-lang', 'react']
  },
  {
    id: 'proj-realtime-metrics',
    name: 'Prometheus & Grafana Observability Suite',
    description: 'Configure distributed logging and Prometheus metrics collection across microservice apps with custom Grafana dashboards.',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    buildsSkillIds: ['prometheus-grafana', 'linux-cli', 'docker', 'nginx'],
    usesTechIds: ['tech-docker', 'tech-linux'],
    prerequisiteSkillIds: ['linux-cli', 'docker']
  },
  {
    id: 'proj-dbt-analytics',
    name: 'Modern Data Warehouse & dbt Pipeline',
    description: 'Transform raw web clickstream JSON data into analytical data marts in Snowflake using SQL and dbt models.',
    difficulty: 'Intermediate',
    estimatedHours: 22,
    buildsSkillIds: ['dbt', 'snowflake', 'sql', 'data-pipelines'],
    usesTechIds: ['tech-sql'],
    prerequisiteSkillIds: ['sql']
  },
  {
    id: 'proj-llm-fine-tuning',
    name: 'Domain-Specific LLM LoRA Fine-Tuner',
    description: 'Fine-tune an open source Llama 3 model on custom technical documentation datasets using PyTorch and Hugging Face PEFT.',
    difficulty: 'Advanced',
    estimatedHours: 32,
    buildsSkillIds: ['fine-tuning', 'transformers', 'pytorch', 'nlp', 'python-lang'],
    usesTechIds: ['tech-py', 'tech-onnx'],
    prerequisiteSkillIds: ['pytorch', 'transformers']
  },
  {
    id: 'proj-task-manager-api',
    name: 'RESTful Task Management API',
    description: 'Clean REST API built with Node.js, Express, and PostgreSQL using JWT authentication and automated Jest unit tests.',
    difficulty: 'Beginner',
    estimatedHours: 12,
    buildsSkillIds: ['nodejs', 'express', 'postgresql', 'testing-unit', 'git'],
    usesTechIds: ['tech-js', 'tech-postgres'],
    prerequisiteSkillIds: ['javascript']
  },
  {
    id: 'proj-personal-portfolio',
    name: 'Developer Portfolio with Next.js & Tailwind',
    description: 'Responsive, highly styled portfolio website with dark mode, MDX blog support, and contact form integration.',
    difficulty: 'Beginner',
    estimatedHours: 10,
    buildsSkillIds: ['html5', 'css3', 'react', 'nextjs', 'tailwindcss'],
    usesTechIds: ['tech-html', 'tech-css', 'tech-ts'],
    prerequisiteSkillIds: ['html5', 'css3']
  },
  {
    id: 'proj-redis-rate-limiter',
    name: 'Distributed Rate Limiter Middleware',
    description: 'High-speed sliding window rate limiting middleware for Express & Fastify using Redis Lua scripts.',
    difficulty: 'Intermediate',
    estimatedHours: 15,
    buildsSkillIds: ['redis', 'nodejs', 'express', 'system-design'],
    usesTechIds: ['tech-redis', 'tech-ts'],
    prerequisiteSkillIds: ['nodejs', 'redis']
  },
  {
    id: 'proj-spring-banking-api',
    name: 'Spring Boot Account Transfer API',
    description: 'Financial ledger API with Spring Boot, JPA/Hibernate, PostgreSQL transaction locking, and Swagger UI.',
    difficulty: 'Intermediate',
    estimatedHours: 25,
    buildsSkillIds: ['java-lang', 'spring-boot', 'sql', 'postgresql'],
    usesTechIds: ['tech-java', 'tech-postgres'],
    prerequisiteSkillIds: ['java-lang', 'sql']
  },
  {
    id: 'proj-spark-log-analyzer',
    name: 'Apache Spark Real-time Log Streamer',
    description: 'Process millions of web access logs per second using PySpark and Kafka, outputting anomaly metrics to Elasticsearch.',
    difficulty: 'Advanced',
    estimatedHours: 35,
    buildsSkillIds: ['apache-spark', 'apache-kafka', 'elasticsearch', 'data-pipelines'],
    usesTechIds: ['tech-spark', 'tech-kafka', 'tech-elasticsearch'],
    prerequisiteSkillIds: ['apache-spark', 'python-lang']
  },
  {
    id: 'proj-trpc-dashboard',
    name: 'Type-Safe Analytics SaaS with tRPC',
    description: 'SaaS analytics platform with end-to-end TypeScript safety using Next.js App Router, tRPC, and Drizzle ORM.',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    buildsSkillIds: ['trpc', 'drizzle', 'nextjs', 'typescript', 'tailwindcss'],
    usesTechIds: ['tech-ts', 'tech-postgres'],
    prerequisiteSkillIds: ['typescript', 'react']
  },
  {
    id: 'proj-react-native-crypto',
    name: 'Crypto Price Tracker Mobile App',
    description: 'Cross-platform mobile app in React Native displaying real-time price updates via WebSockets with interactive charts.',
    difficulty: 'Intermediate',
    estimatedHours: 22,
    buildsSkillIds: ['react-native', 'react', 'websockets', 'state-mgmt'],
    usesTechIds: ['tech-js'],
    prerequisiteSkillIds: ['react', 'javascript']
  },
  {
    id: 'proj-mlops-model-registry',
    name: 'Automated MLOps Model CI/CD',
    description: 'Automate model training, validation, and Docker container deployment to AWS SageMaker using MLflow and GitHub Actions.',
    difficulty: 'Advanced',
    estimatedHours: 30,
    buildsSkillIds: ['mlops', 'cicd', 'docker', 'aws', 'machine-learning'],
    usesTechIds: ['tech-docker', 'tech-aws', 'tech-py'],
    prerequisiteSkillIds: ['machine-learning', 'docker']
  },
  {
    id: 'proj-microfrontends-shell',
    name: 'Enterprise Micro-Frontend Portal',
    description: 'Module Federation architecture loading independent React and Vue sub-applications dynamically inside a Next.js host shell.',
    difficulty: 'Advanced',
    estimatedHours: 38,
    buildsSkillIds: ['microfrontends', 'nextjs', 'react', 'vue', 'web-perf'],
    usesTechIds: ['tech-ts', 'tech-js'],
    prerequisiteSkillIds: ['react', 'nextjs']
  },
  {
    id: 'proj-rust-cli-tool',
    name: 'High-Speed Log Parser CLI in Rust',
    description: 'Blazing fast command line utility written in Rust to parse and extract JSON statistics from gigabyte file streams.',
    difficulty: 'Advanced',
    estimatedHours: 18,
    buildsSkillIds: ['rust-lang', 'git'],
    usesTechIds: ['tech-rust'],
    prerequisiteSkillIds: ['rust-lang']
  },
  {
    id: 'proj-go-url-shortener',
    name: 'High-Throughput Go URL Shortener',
    description: 'Concurrent URL redirection service built in Go with Redis caching and PostgreSQL persistent storage.',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    buildsSkillIds: ['golang', 'redis', 'postgresql', 'docker'],
    usesTechIds: ['tech-go', 'tech-redis', 'tech-postgres'],
    prerequisiteSkillIds: ['golang']
  },
  {
    id: 'proj-serverless-image-resizer',
    name: 'AWS Serverless Image Processing Pipeline',
    description: 'Event-driven image pipeline using S3 upload triggers, AWS Lambda node functions, and DynamoDB metadata logs.',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    buildsSkillIds: ['serverless', 'aws', 'nodejs'],
    usesTechIds: ['tech-aws', 'tech-js'],
    prerequisiteSkillIds: ['aws', 'nodejs']
  },
  {
    id: 'proj-airflow-weather-pipeline',
    name: 'Airflow Weather ETL Pipeline',
    description: 'Schedule daily ETL pipelines pulling weather API metrics, normalizing data in Python, and loading into PostgreSQL.',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    buildsSkillIds: ['airflow', 'data-pipelines', 'python-lang', 'postgresql'],
    usesTechIds: ['tech-py', 'tech-postgres'],
    prerequisiteSkillIds: ['python-lang', 'sql']
  },
  {
    id: 'proj-deeplearning-vision',
    name: 'PyTorch Image Classification Model',
    description: 'Train a ResNet Convolutional Neural Network on medical images using PyTorch with data augmentation and validation metrics.',
    difficulty: 'Intermediate',
    estimatedHours: 24,
    buildsSkillIds: ['pytorch', 'deep-learning', 'opencv', 'python-lang'],
    usesTechIds: ['tech-py'],
    prerequisiteSkillIds: ['python-lang', 'deep-learning']
  },
  {
    id: 'proj-flutter-todo',
    name: 'Flutter Cross-Platform Expense Tracker',
    description: 'Clean mobile application built with Flutter & Dart featuring local SQLite storage and custom graphical charts.',
    difficulty: 'Beginner',
    estimatedHours: 15,
    buildsSkillIds: ['flutter', 'sql'],
    usesTechIds: ['tech-js'],
    prerequisiteSkillIds: ['javascript']
  },
  {
    id: 'proj-web-vitals-optimizer',
    name: 'E-Commerce Core Web Vitals Overhaul',
    description: 'Refactor an existing monolithic web page to achieve 98+ Lighthouse scores using code splitting, image optimization, and CDN caching.',
    difficulty: 'Advanced',
    estimatedHours: 20,
    buildsSkillIds: ['web-perf', 'nextjs', 'tailwindcss', 'css3'],
    usesTechIds: ['tech-ts', 'tech-css'],
    prerequisiteSkillIds: ['nextjs', 'react']
  },
  {
    id: 'proj-auth-oauth-service',
    name: 'OAuth2 & JWT Identity Provider Service',
    description: 'Standalone authentication microservice supporting Social OAuth (Google/GitHub), refresh tokens, and rate-limited login.',
    difficulty: 'Intermediate',
    estimatedHours: 22,
    buildsSkillIds: ['web-security', 'nodejs', 'express', 'postgresql', 'redis'],
    usesTechIds: ['tech-js', 'tech-postgres'],
    prerequisiteSkillIds: ['express', 'nodejs']
  },
  {
    id: 'proj-fastapi-ml-serving',
    name: 'FastAPI Machine Learning Inference Server',
    description: 'Serve ONNX/PyTorch models via asynchronous FastAPI routes with request validation and Docker containerization.',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    buildsSkillIds: ['fastapi', 'python-lang', 'docker', 'machine-learning'],
    usesTechIds: ['tech-py', 'tech-docker'],
    prerequisiteSkillIds: ['fastapi', 'machine-learning']
  },
  {
    id: 'proj-nestjs-chat-backend',
    name: 'NestJS Microservices Enterprise Chat',
    description: 'Enterprise grade messaging backend with NestJS, Socket.io WebSockets, Redis Adapter, and MongoDB chat log persistence.',
    difficulty: 'Advanced',
    estimatedHours: 32,
    buildsSkillIds: ['nestjs', 'websockets', 'mongodb', 'redis', 'typescript'],
    usesTechIds: ['tech-ts', 'tech-mongodb', 'tech-redis'],
    prerequisiteSkillIds: ['nestjs', 'typescript']
  },
  {
    id: 'proj-vector-search-engine',
    name: 'Hybrid Semantic & Keyword Search Engine',
    description: 'Combine BM25 full-text indexing in Elasticsearch with vector embeddings in Pinecone for state-of-the-art hybrid document search.',
    difficulty: 'Advanced',
    estimatedHours: 28,
    buildsSkillIds: ['vector-db', 'elasticsearch', 'nlp', 'python-lang'],
    usesTechIds: ['tech-pinecone', 'tech-elasticsearch'],
    prerequisiteSkillIds: ['vector-db', 'elasticsearch']
  },
  {
    id: 'proj-clean-architecture-node',
    name: 'Clean Architecture Node Boilerplate',
    description: 'Enterprise Node.js starter template implementing Domain-Driven Design (DDD), dependency injection, and Repository pattern.',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    buildsSkillIds: ['design-patterns', 'typescript', 'nodejs', 'testing-unit'],
    usesTechIds: ['tech-ts'],
    prerequisiteSkillIds: ['typescript', 'nodejs']
  },
  {
    id: 'proj-terraform-aws-vpc',
    name: 'Multi-AZ AWS VPC & EKS Cluster IaC',
    description: 'Provision an automated multi-Availability Zone Virtual Private Cloud with NAT Gateways and Elastic Kubernetes Service using Terraform.',
    difficulty: 'Advanced',
    estimatedHours: 26,
    buildsSkillIds: ['terraform', 'aws', 'kubernetes'],
    usesTechIds: ['tech-terraform', 'tech-aws', 'tech-k8s'],
    prerequisiteSkillIds: ['terraform', 'aws']
  },
  {
    id: 'proj-wasm-image-filter',
    name: 'WebAssembly Canvas Image Filter Tool',
    description: 'High performance browser image manipulation web app executing Rust compiled to WebAssembly (Wasm) inside HTML5 Canvas.',
    difficulty: 'Advanced',
    estimatedHours: 22,
    buildsSkillIds: ['webassembly', 'rust-lang', 'javascript', 'html5'],
    usesTechIds: ['tech-wasm', 'tech-rust', 'tech-js'],
    prerequisiteSkillIds: ['javascript', 'rust-lang']
  },
  {
    id: 'proj-pwa-offline-notes',
    name: 'Offline-First Progressive Web App',
    description: 'Note taking PWA using Service Workers for offline caching and IndexedDB sync on network reconnection.',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    buildsSkillIds: ['pwa', 'javascript', 'html5', 'css3'],
    usesTechIds: ['tech-js', 'tech-html'],
    prerequisiteSkillIds: ['javascript']
  },
  {
    id: 'proj-django-cms',
    name: 'Multi-Tenant Django CMS Portal',
    description: 'Content management platform supporting multiple subdomains, role-based access control (RBAC), and PostgreSQL database partitioning.',
    difficulty: 'Intermediate',
    estimatedHours: 24,
    buildsSkillIds: ['django', 'python-lang', 'postgresql', 'sql'],
    usesTechIds: ['tech-py', 'tech-postgres'],
    prerequisiteSkillIds: ['django', 'python-lang']
  },
  {
    id: 'proj-state-management-benchmark',
    name: 'React State Management Performance Lab',
    description: 'Benchmarking suite testing re-render speeds across Redux Toolkit, Zustand, Jotai, and Context API under heavy DOM loads.',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    buildsSkillIds: ['state-mgmt', 'react', 'web-perf', 'typescript'],
    usesTechIds: ['tech-ts'],
    prerequisiteSkillIds: ['react', 'state-mgmt']
  },
  {
    id: 'proj-nginx-loadbalancer',
    name: 'Custom Nginx Reverse Proxy & Load Balancer',
    description: 'Configure Nginx with custom SSL certificates, health checks, rate limiting, and weighted round-robin backend routing.',
    difficulty: 'Beginner',
    estimatedHours: 8,
    buildsSkillIds: ['nginx', 'linux-cli', 'web-security'],
    usesTechIds: ['tech-nginx', 'tech-linux'],
    prerequisiteSkillIds: ['linux-cli']
  },
  {
    id: 'proj-java-microservices-kafka',
    name: 'Spring Cloud Microservices with Kafka Event Bus',
    description: 'Distributed inventory and billing microservices connected via Spring Cloud Netflix Eureka discovery and Apache Kafka topics.',
    difficulty: 'Advanced',
    estimatedHours: 42,
    buildsSkillIds: ['spring-boot', 'java-lang', 'apache-kafka', 'microservices'],
    usesTechIds: ['tech-java', 'tech-kafka'],
    prerequisiteSkillIds: ['spring-boot', 'java-lang']
  },
  {
    id: 'proj-vue-dashboard',
    name: 'Vue 3 Admin Analytics Dashboard',
    description: 'Sleek admin UI built with Vue 3 Composition API, Pinia store, Chart.js graphs, and Tailwind CSS dark mode styling.',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    buildsSkillIds: ['vue', 'javascript', 'tailwindcss'],
    usesTechIds: ['tech-js', 'tech-css'],
    prerequisiteSkillIds: ['javascript']
  },
  {
    id: 'proj-langchain-agent-tools',
    name: 'Autonomous Web Scraping AI Agent',
    description: 'Build a multi-agent system with LangChain that navigates web links, summarizes pages, and writes structured JSON reports.',
    difficulty: 'Advanced',
    estimatedHours: 26,
    buildsSkillIds: ['langchain', 'python-lang', 'prompt-eng', 'rag-arch'],
    usesTechIds: ['tech-py'],
    prerequisiteSkillIds: ['langchain', 'python-lang']
  }
];

// 40 LEARNING RESOURCES
export const RESOURCES: SeedResource[] = [
  { id: 'res-1', name: 'Official React Documentation & Interactive Tutorials', url: 'https://react.dev', typeFormat: 'Documentation', rating: 4.9, duration: '15 hours', teachesSkillId: 'react' },
  { id: 'res-2', name: 'TypeScript Handbook: Full In-depth Guide', url: 'https://www.typescriptlang.org/docs/', typeFormat: 'Documentation', rating: 4.8, duration: '12 hours', teachesSkillId: 'typescript' },
  { id: 'res-3', name: 'Neo4j Graph Academy: Cypher Query Fundamentals', url: 'https://graphacademy.neo4j.com', typeFormat: 'Interactive', rating: 4.9, duration: '10 hours', teachesSkillId: 'neo4j' },
  { id: 'res-4', name: 'DeepLearning.AI: LangChain for LLM Application Development', url: 'https://www.deeplearning.ai', typeFormat: 'Course', rating: 4.9, duration: '8 hours', teachesSkillId: 'langchain' },
  { id: 'res-5', name: 'Docker Mastery: The Complete Toolset from Beginner to Pro', url: 'https://www.udemy.com', typeFormat: 'Course', rating: 4.8, duration: '20 hours', teachesSkillId: 'docker' },
  { id: 'res-6', name: 'Kubernetes Official Documentation & Interactive Katacoda Labs', url: 'https://kubernetes.io/docs/', typeFormat: 'Interactive', rating: 4.7, duration: '25 hours', teachesSkillId: 'kubernetes' },
  { id: 'res-7', name: 'Next.js 14 Complete Masterclass (App Router & Server Components)', url: 'https://nextjs.org/learn', typeFormat: 'Course', rating: 4.9, duration: '18 hours', teachesSkillId: 'nextjs' },
  { id: 'res-8', name: 'FastAPI Official Tutorial & Async Python Best Practices', url: 'https://fastapi.tiangolo.com', typeFormat: 'Documentation', rating: 4.9, duration: '10 hours', teachesSkillId: 'fastapi' },
  { id: 'res-9', name: 'PostgreSQL High Performance Query Tuning & Indexing', url: 'https://use-the-index-luke.com', typeFormat: 'Book', rating: 4.8, duration: '14 hours', teachesSkillId: 'postgresql' },
  { id: 'res-10', name: 'Designing Data-Intensive Applications by Martin Kleppmann', url: 'https://dataintensive.net', typeFormat: 'Book', rating: 5.0, duration: '40 hours', teachesSkillId: 'system-design' },
  { id: 'res-11', name: 'PyTorch Deep Learning Developer Certification Series', url: 'https://pytorch.org/tutorials/', typeFormat: 'Interactive', rating: 4.8, duration: '30 hours', teachesSkillId: 'pytorch' },
  { id: 'res-12', name: 'AWS Certified Solutions Architect Associate Course', url: 'https://aws.amazon.com/training/', typeFormat: 'Course', rating: 4.8, duration: '35 hours', teachesSkillId: 'aws' },
  { id: 'res-13', name: 'Hugging Face NLP Course: Transformer Architecture', url: 'https://huggingface.co/learn/nlp-course', typeFormat: 'Interactive', rating: 4.9, duration: '20 hours', teachesSkillId: 'transformers' },
  { id: 'res-14', name: 'Apache Kafka Series: Real-time Event Streaming Architecture', url: 'https://confluent.io/resources', typeFormat: 'Course', rating: 4.7, duration: '16 hours', teachesSkillId: 'apache-kafka' },
  { id: 'res-15', name: 'Redis University: Certified Redis Developer Course', url: 'https://university.redis.com', typeFormat: 'Interactive', rating: 4.8, duration: '12 hours', teachesSkillId: 'redis' },
  { id: 'res-16', name: 'Node.js Design Patterns: Enterprise Backend Masterclass', url: 'https://nodejsdesignpatterns.com', typeFormat: 'Book', rating: 4.9, duration: '25 hours', teachesSkillId: 'nodejs' },
  { id: 'res-17', name: 'Tailwind CSS Official Video Series & Component Docs', url: 'https://tailwindcss.com/docs', typeFormat: 'Video', rating: 4.9, duration: '6 hours', teachesSkillId: 'tailwindcss' },
  { id: 'res-18', name: 'Rust Programming Language Book (The Rustonomicon)', url: 'https://doc.rust-lang.org/book/', typeFormat: 'Book', rating: 4.9, duration: '28 hours', teachesSkillId: 'rust-lang' },
  { id: 'res-19', name: 'GraphQL Official Guide & Apollo Server Crash Course', url: 'https://graphql.org/learn/', typeFormat: 'Documentation', rating: 4.7, duration: '8 hours', teachesSkillId: 'graphql' },
  { id: 'res-20', name: 'Terraform Up & Running: Infrastructure as Code', url: 'https://www.terraform.io/docs', typeFormat: 'Book', rating: 4.8, duration: '15 hours', teachesSkillId: 'terraform' },
  { id: 'res-21', name: 'Python for Data Science and Machine Learning Bootcamp', url: 'https://www.udemy.com', typeFormat: 'Course', rating: 4.8, duration: '25 hours', teachesSkillId: 'python-lang' },
  { id: 'res-22', name: 'Vector Search & RAG Architecture Masterclass', url: 'https://pinecone.io/learn', typeFormat: 'Documentation', rating: 4.9, duration: '10 hours', teachesSkillId: 'rag-arch' },
  { id: 'res-23', name: 'Spring Boot 3 & Spring Cloud Microservices Guide', url: 'https://spring.io/guides', typeFormat: 'Documentation', rating: 4.7, duration: '22 hours', teachesSkillId: 'spring-boot' },
  { id: 'res-24', name: 'Full Stack Open 2024: React, Redux, Node.js & GraphQL', url: 'https://fullstackopen.com/en/', typeFormat: 'Interactive', rating: 4.9, duration: '50 hours', teachesSkillId: 'express' },
  { id: 'res-25', name: 'MongoDB University: Proof of Concept to Production', url: 'https://learn.mongodb.com', typeFormat: 'Interactive', rating: 4.8, duration: '14 hours', teachesSkillId: 'mongodb' },
  { id: 'res-26', name: 'Apache Spark with PySpark for Big Data Processing', url: 'https://spark.apache.org/docs/latest/', typeFormat: 'Documentation', rating: 4.6, duration: '20 hours', teachesSkillId: 'apache-spark' },
  { id: 'res-27', name: 'gRPC & Protocol Buffers in Go & Node.js', url: 'https://grpc.io/docs/', typeFormat: 'Documentation', rating: 4.7, duration: '9 hours', teachesSkillId: 'gRPC' },
  { id: 'res-28', name: 'Modern CSS Layouts: Flexbox, Grid and Container Queries', url: 'https://css-tricks.com', typeFormat: 'Documentation', rating: 4.9, duration: '8 hours', teachesSkillId: 'css3' },
  { id: 'res-29', name: 'TanStack Query (React Query) In-Depth Tutorial', url: 'https://tanstack.com/query/latest', typeFormat: 'Documentation', rating: 4.9, duration: '7 hours', teachesSkillId: 'tanstack-query' },
  { id: 'res-30', name: 'Linux System Administration & Command Line Secrets', url: 'https://linuxjourney.com', typeFormat: 'Interactive', rating: 4.9, duration: '15 hours', teachesSkillId: 'linux-cli' },
  { id: 'res-31', name: 'OWASP Top 10 Web Application Security Guide', url: 'https://owasp.org', typeFormat: 'Documentation', rating: 4.9, duration: '12 hours', teachesSkillId: 'web-security' },
  { id: 'res-32', name: 'Apache Airflow Fundamentals & Workflow Engineering', url: 'https://airflow.apache.org/docs/', typeFormat: 'Documentation', rating: 4.7, duration: '14 hours', teachesSkillId: 'airflow' },
  { id: 'res-33', name: 'dbt Learn: Fundamentals of Analytics Engineering', url: 'https://courses.getdbt.com', typeFormat: 'Interactive', rating: 4.9, duration: '10 hours', teachesSkillId: 'dbt' },
  { id: 'res-34', name: 'Go by Example: Hands-on Golang Exercises', url: 'https://gobyexample.com', typeFormat: 'Interactive', rating: 4.9, duration: '12 hours', teachesSkillId: 'golang' },
  { id: 'res-35', name: 'MLOps Specialization by Andrew Ng', url: 'https://coursera.org', typeFormat: 'Course', rating: 4.9, duration: '30 hours', teachesSkillId: 'mlops' },
  { id: 'res-36', name: 'WebAssembly Fundamentals & AssemblyScript', url: 'https://webassembly.org', typeFormat: 'Documentation', rating: 4.6, duration: '10 hours', teachesSkillId: 'webassembly' },
  { id: 'res-37', name: 'Building Micro-Frontends: Scalable Frontend Architecture', url: 'https://micro-frontends.org', typeFormat: 'Book', rating: 4.7, duration: '16 hours', teachesSkillId: 'microfrontends' },
  { id: 'res-38', name: 'OpenCV Computer Vision with Python Masterclass', url: 'https://pyimagesearch.com', typeFormat: 'Course', rating: 4.8, duration: '22 hours', teachesSkillId: 'opencv' },
  { id: 'res-39', name: 'Prisma ORM Guided Workshop & Schema Modeling', url: 'https://www.prisma.io/docs/', typeFormat: 'Documentation', rating: 4.8, duration: '8 hours', teachesSkillId: 'prisma' },
  { id: 'res-40', name: 'Elasticsearch Engineer Official Certification Course', url: 'https://www.elastic.co/training', typeFormat: 'Course', rating: 4.8, duration: '18 hours', teachesSkillId: 'elasticsearch' }
];
