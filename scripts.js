// scripts.js
// Initializes Mermaid, loads chart definitions from charts.json, renders them, and moves all inline UI logic here.

// First, load mermaid via the script tag to ensure it's available
document.addEventListener('DOMContentLoaded', () => {
  // Add mermaid script tag if not already present
  if (!window.mermaid) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = initializeMermaid;
    document.head.appendChild(script);
  } else {
    initializeMermaid();
  }
});

function initializeMermaid() {
  // Mermaid initialization config
  const mermaidConfig = {
    startOnLoad: false, // we'll call run() after injecting charts
    theme: 'dark',
    themeVariables: {
      primaryColor: '#8B5CF6',
      primaryTextColor: '#f1f5f9',
      primaryBorderColor: '#8B5CF6',
      lineColor: '#8B5CF6',
      secondaryColor: '#10b981',
      tertiaryColor: '#f59e0b',
      background: '#000000',
      mainBkg: '#1e293b',
      secondBkg: '#334155',
      tertiaryBkg: '#475569',
      textColor: '#f1f5f9',
      border1: '#2A2A2A',
      border2: '#3A3A3A',
      nodeBorder: '#8B5CF6',
      clusterBkg: '#0D0D0D',
      clusterBorder: '#2A2A2A',
      defaultLinkColor: '#8B5CF6',
      titleColor: '#f1f5f9',
      edgeLabelBackground: '#1e293b',
      actorBorder: '#8B5CF6',
      actorBkg: '#8B5CF6',
      actorTextColor: '#f1f5f9',
      actorLineColor: '#8B5CF6',
      signalColor: '#f1f5f9',
      signalTextColor: '#f1f5f9',
      labelBoxBkgColor: '#1e293b',
      labelBoxBorderColor: '#8B5CF6',
      labelTextColor: '#f1f5f9',
      loopTextColor: '#f1f5f9',
      noteBorderColor: '#8B5CF6',
      noteBkgColor: '#1e293b',
      noteTextColor: '#f1f5f9',
      activationBorderColor: '#8B5CF6',
      activationBkgColor: '#8B5CF6',
      sequenceNumberColor: '#f1f5f9',
      sectionBkgColor: '#1e293b',
      altSectionBkgColor: '#0D0D0D',
      sectionBkgColor2: '#334155',
      taskBorderColor: '#8B5CF6',
      taskBkgColor: '#8B5CF6',
      taskTextColor: '#f1f5f9',
      taskTextLightColor: '#f1f5f9',
      taskTextOutsideColor: '#f1f5f9',
      taskTextClickableColor: '#A78BFA',
      activeTaskBorderColor: '#10b981',
      activeTaskBkgColor: '#10b981',
      gridColor: '#2A2A2A',
      doneTaskBkgColor: '#334155',
      doneTaskBorderColor: '#475569',
      critBorderColor: '#ef4444',
      critBkgColor: '#991b1b',
      todayLineColor: '#f59e0b',
      git0: '#8B5CF6',
      git1: '#10b981',
      git2: '#f59e0b',
      git3: '#ef4444',
      git4: '#ec4899',
      git5: '#06b6d4',
      git6: '#A78BFA',
      git7: '#6EE7B7',
      gitInv0: '#f1f5f9',
      gitInv1: '#f1f5f9',
      gitInv2: '#f1f5f9',
      gitInv3: '#f1f5f9',
      gitInv4: '#f1f5f9',
      gitInv5: '#f1f5f9',
      gitInv6: '#f1f5f9',
      gitInv7: '#f1f5f9',
      gitBranchLabel0: '#f1f5f9',
      gitBranchLabel1: '#f1f5f9',
      gitBranchLabel2: '#f1f5f9',
      gitBranchLabel3: '#f1f5f9',
      gitBranchLabel4: '#f1f5f9',
      gitBranchLabel5: '#f1f5f9',
      gitBranchLabel6: '#f1f5f9',
      gitBranchLabel7: '#f1f5f9',
      commitLabelColor: '#f1f5f9',
      commitLabelBackground: '#1e293b',
      commitLabelFontSize: '12px',
      tagLabelColor: '#f1f5f9',
      tagLabelBackground: '#10b981',
      tagLabelBorder: '#059669',
      tagLabelFontSize: '11px',
      attributeBackgroundColorOdd: '#0D0D0D',
      attributeBackgroundColorEven: '#1e293b',
    },
    securityLevel: 'loose',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    flowchart: {
      curve: 'bundle',
      padding: 20,
      nodeSpacing: 70,
      rankSpacing: 70,
      diagramPadding: 16,
      htmlLabels: true,
      useMaxWidth: true,
      rankdir: 'TB',
      beta: 0.85
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 12,
      numberSectionStyles: 4,
      axisFormat: '%m-%d',
      topAxis: false
    },
    gitGraph: {
      showBranches: true,
      showCommitLabel: true,
      mainBranchName: 'main',
      rotateCommitLabel: false
    }
  };

  // Initialize mermaid with configuration
  try {
    window.mermaid.initialize(mermaidConfig);
    console.log("Mermaid initialized successfully");

    // Now that mermaid is initialized, load charts
    loadCharts();
  } catch (err) {
    console.error("Error initializing Mermaid:", err);
  }
}

async function loadCharts() {
  try {
    // Embed chart definitions directly instead of fetching from charts.json to avoid CORS issues
    const data = {
      "charts": [
        {
          "id": "architecture",
          "definition": "graph TB\n    subgraph \"User Layer\"\n        Users[Users/Clients]\n    end\n    \n    subgraph \"CDN & DNS\"\n        CF[CloudFront CDN]\n        R53[Route53 DNS]\n    end\n    \n    subgraph \"AWS VPC\"\n        subgraph \"Public Subnet\"\n            ALB[Application Load Balancer]\n        end\n\n        subgraph \"Private Subnet - EKS Cluster\"\n            K8S[Kubernetes EKS]\n            FE[Frontend Pods<br/>React SPA]\n            BE[Backend Pods<br/>Django API]\n        end\n\n        subgraph \"Data Layer\"\n            RDS[(RDS PostgreSQL<br/>Multi-AZ)]\n            Redis[(ElastiCache Redis)]\n            S3[(S3 Bucket<br/>Static Assets)]\n        end\n    end\n    \n    subgraph \"CI/CD Pipeline\"\n        GH[GitHub Actions]\n        ECR[AWS ECR<br/>Container Registry]\n    end\n    \n    subgraph \"Monitoring & Security\"\n        PROM[Prometheus]\n        GRAF[Grafana]\n        CW[CloudWatch]\n        SM[Secrets Manager]\n    end\n    \n    Users --> R53\n    R53 --> CF\n    CF --> ALB\n    ALB --> K8S\n    K8S --> FE\n    K8S --> BE\n    BE --> RDS\n    BE --> Redis\n    FE --> S3\n    CF --> S3\n    \n    GH --> ECR\n    ECR --> K8S\n    \n    K8S --> PROM\n    PROM --> GRAF\n    K8S --> CW\n    BE --> SM\n    \n    style Users fill:#726ce5,color:#fff\n    style K8S fill:#326ce5,color:#fff\n    style RDS fill:#527fff,color:#fff\n    style Redis fill:#dc382d,color:#fff\n    style GH fill:#24292e,color:#fff"
        },
        {
          "id": "timeline",
          "definition": "flowchart LR\n    subgraph \"DevOps Learning Timeline (10-15 hrs/week)\"\n        direction TB\n        \n        subgraph \"Fundamentals\"\n            p1[\"Phase 1: Fundamentals & Prerequisites<br/>(1 week)\"] -.-> p2[\"Phase 2: Git & Version Control<br/>(1 week)\"] \n        end\n        \n        subgraph \"Infrastructure\"\n            p3[\"Phase 3: Linux Basics<br/>(2 weeks)\"] -.-> p4[\"Phase 4: AWS & Networking<br/>(6 weeks)\"]  \n        end\n        \n        subgraph \"Automation\"\n            p5[\"Phase 5: Terraform (IaC)<br/>(2 weeks)\"] -.-> p6[\"Phase 6: Ansible (Config Mgmt)<br/>(2 weeks)\"] \n        end\n        \n        subgraph \"Containers\"\n            p7[\"Phase 7: Docker (Containerization)<br/>(2 weeks)\"] -.-> p8[\"Phase 8: Kubernetes & EKS<br/>(4 weeks)\"] \n        end\n        \n        subgraph \"CI/CD & Quality\"\n            p9[\"Phase 9: CI/CD Pipelines<br/>(3 weeks)\"] \n            p9a[\"Phase 9A: Testing & QA<br/>(1 week)\"] \n            p9b[\"Phase 9B: Policy as Code<br/>(1 week)\"] \n        end\n        \n        subgraph \"Operations\"\n            p10[\"Phase 10: Monitoring & Observability<br/>(3 weeks)\"] -.-> p11[\"Phase 11: Security & Compliance<br/>(3 weeks)\"] \n        end\n        \n        subgraph \"Advanced\"\n            p12[\"Phase 12: Production Hardening<br/>(3 weeks)\"]\n        end\n    \n        p2 --> p3\n        p4 --> p5\n        p6 --> p7\n        p8 --> p9\n        p9 --> p9a\n        p9a --> p9b\n        p9b --> p10\n        p11 --> p12\n        \n        classDef done fill:#4caf50,color:#fff,stroke:#2e7d32,stroke-width:2px\n        classDef active fill:#ff9800,color:#fff,stroke:#ef6c00,stroke-width:2px\n        classDef todo fill:#1e293b,color:#fff,stroke:#8B5CF6,stroke-width:1px\n        \n        class p1,p2 done\n        class p3 active\n        class p4,p5,p6,p7,p8,p9,p9a,p9b,p10,p11,p12 todo\n    end"
        },
        {
          "id": "three-ways",
          "definition": "graph LR\n    subgraph \"The Three Ways of DevOps\"\n        A[Flow] --> B[Feedback]\n        B --> C[Continuous Learning]\n        C --> A\n    end\n    \n    subgraph \"Flow: Speed of Delivery\"\n        A --> A1[Automate Everything]\n        A --> A2[Small Batch Sizes]\n        A --> A3[Reduce Handoffs]\n    end\n    \n    subgraph \"Feedback: Quality & Safety\"\n        B --> B1[Monitor Everything]\n        B --> B2[Fast Detection]\n        B --> B3[Quick Recovery]\n    end\n    \n    subgraph \"Learning: Innovation\"\n        C --> C1[Experimentation]\n        C --> C2[Share Knowledge]\n        C --> C3[Improve Daily]\n    end\n    \n    style A fill:#4caf50,color:#fff\n    style B fill:#2196f3,color:#fff\n    style C fill:#ff9800,color:#fff"
        },
        {
          "id": "git-graph",
          "definition": "gitGraph\n    commit id: \"Initial commit\"\n    branch develop\n    checkout develop\n    commit id: \"Setup project\"\n    \n    branch feature/user-auth\n    checkout feature/user-auth\n    commit id: \"Add login\"\n    commit id: \"Add registration\"\n    \n    checkout develop\n    merge feature/user-auth\n    \n    branch feature/task-crud\n    checkout feature/task-crud\n    commit id: \"Create tasks\"\n    commit id: \"Update tasks\"\n    \n    checkout develop\n    merge feature/task-crud\n    \n    checkout main\n    merge develop tag: \"v1.0.0\"\n    \n    checkout develop\n    branch hotfix/security-patch\n    checkout hotfix/security-patch\n    commit id: \"Security fix\"\n    \n    checkout main\n    merge hotfix/security-patch tag: \"v1.0.1\"\n    \n    checkout develop\n    merge hotfix/security-patch"
        },
        {
          "id": "aws-vpc",
          "definition": "graph TB\n    subgraph \"AWS VPC - 10.0.0.0/16\"\n        subgraph \"Availability Zone 1\"\n            PUB1[Public Subnet<br/>10.0.1.0/24]\n            PRIV1[Private Subnet<br/>10.0.11.0/24]\n        end\n\n        subgraph \"Availability Zone 2\"\n            PUB2[Public Subnet<br/>10.0.2.0/24]\n            PRIV2[Private Subnet<br/>10.0.12.0/24]\n        end\n\n        IGW[Internet Gateway]\n        NAT1[NAT Gateway AZ1]\n        NAT2[NAT Gateway AZ2]\n        ALB[Application Load Balancer]\n\n        subgraph \"Compute\"\n            ASG[Auto Scaling Group]\n            EC2_1[EC2 Instance]\n            EC2_2[EC2 Instance]\n        end\n\n        subgraph \"Data Layer\"\n            RDS_PRIMARY[(RDS Primary<br/>AZ1)]\n            RDS_STANDBY[(RDS Standby<br/>AZ2)]\n            REDIS[(ElastiCache Redis)]\n        end\n    end\n    \n    INTERNET((Internet))\n    \n    INTERNET --> IGW\n    IGW --> PUB1\n    IGW --> PUB2\n    PUB1 --> NAT1\n    PUB2 --> NAT2\n    PUB1 --> ALB\n    PUB2 --> ALB\n    \n    NAT1 --> PRIV1\n    NAT2 --> PRIV2\n    \n    ALB --> ASG\n    ASG --> EC2_1\n    ASG --> EC2_2\n    PRIV1 --> EC2_1\n    PRIV2 --> EC2_2\n    \n    EC2_1 --> RDS_PRIMARY\n    EC2_2 --> RDS_PRIMARY\n    RDS_PRIMARY -.->|Replication| RDS_STANDBY\n    \n    EC2_1 --> REDIS\n    EC2_2 --> REDIS\n    \n    style IGW fill:#ff9800,color:#fff\n    style ALB fill:#4caf50,color:#fff\n    style RDS_PRIMARY fill:#2196f3,color:#fff\n    style RDS_STANDBY fill:#2196f3,color:#fff\n    style REDIS fill:#dc382d,color:#fff"
        },
        {
          "id": "terraform-flow",
          "definition": "flowchart TD\n    A[terraform init] --> B[Download Providers]\n    B --> C[Initialize Backend]\n    C --> D[terraform plan]\n    D --> E{Review Changes}\n    E -->|Approve| F[terraform apply]\n    E -->|Reject| G[Modify Configuration]\n    G --> D\n    F --> H[Create/Update Resources]\n    H --> I[Update State File]\n    I --> J{Success?}\n    J -->|Yes| K[Infrastructure Ready]\n    J -->|No| L[terraform destroy]\n    L --> M[Troubleshoot]\n    M --> D\n    \n    subgraph \"State Management\"\n        I --> N[(Remote State<br/>S3 + DynamoDB)]\n    end\n    \n    subgraph \"Modules\"\n        D --> O[VPC Module]\n        D --> P[RDS Module]\n        D --> Q[EKS Module]\n    end\n    \n    style F fill:#4caf50,color:#fff\n    style L fill:#f44336,color:#fff\n    style N fill:#2196f3,color:#fff"
        },
        {
          "id": "docker-pipeline",
          "definition": "graph LR\n    subgraph \"Development\"\n        CODE[Source Code]\n        DF[Dockerfile]\n    end\n    \n    subgraph \"Build Process\"\n        CODE --> BUILD[docker build]\n        DF --> BUILD\n        BUILD --> IMG[Docker Image]\n    end\n    \n    subgraph \"Multi-Stage Build\"\n        STAGE1[Stage 1: Build<br/>node:18 alpine]\n        STAGE2[Stage 2: Production<br/>nginx:alpine]\n        STAGE1 --> STAGE2\n    end\n    \n    subgraph \"Registry\"\n        IMG --> PUSH[docker push]\n        PUSH --> ECR[AWS ECR]\n        PUSH --> DOCKER[Docker Hub]\n    end\n    \n    subgraph \"Deployment\"\n        ECR --> PULL[docker pull]\n        DOCKER --> PULL\n        PULL --> RUN[docker run]\n        RUN --> CONTAINER[Running Container]\n    end\n    \n    subgraph \"Local Development\"\n        DC[docker-compose.yml]\n        DC --> SERVICES[Backend + Frontend<br/>+ Database + Redis]\n    end\n    \n    style BUILD fill:#2496ed,color:#fff\n    style IMG fill:#2496ed,color:#fff\n    style ECR fill:#ff9900,color:#fff\n    style CONTAINER fill:#4caf50,color:#fff"
        },
        {
          "id": "k8s-architecture",
          "definition": "graph TB\n    subgraph \"Kubernetes Cluster Architecture\"\n        subgraph \"Control Plane\"\n            API[API Server]\n            SCHED[Scheduler]\n            CM[Controller Manager]\n            ETCD[(etcd Database)]\n        end\n\n        subgraph \"Worker Node 1\"\n            KUBELET1[Kubelet]\n            PROXY1[kube-proxy]\n            \n            subgraph \"Pods\"\n                POD1[Frontend Pod]\n                POD2[Backend Pod]\n            end\n        end\n\n        subgraph \"Worker Node 2\"\n            KUBELET2[Kubelet]\n            PROXY2[kube-proxy]\n            \n            subgraph \"Pods \"\n                POD3[Frontend Pod]\n                POD4[Backend Pod]\n            end\n        end\n\n        subgraph \"Ingress & Services\"\n            ING[Ingress Controller]\n            SVC[Service Layer]\n        end\n    end\n    \n    USER((Users)) --> ING\n    ING --> SVC\n    \n    API --> SCHED\n    API --> CM\n    API --> ETCD\n    \n    SCHED --> KUBELET1\n    SCHED --> KUBELET2\n    \n    KUBELET1 --> POD1\n    KUBELET1 --> POD2\n    KUBELET2 --> POD3\n    KUBELET2 --> POD4\n    \n    SVC --> PROXY1\n    SVC --> PROXY2\n    PROXY1 --> POD1\n    PROXY1 --> POD2\n    PROXY2 --> POD3\n    PROXY2 --> POD4\n    \n    subgraph \"Storage\"\n        PV[(Persistent Volumes)]\n    end\n    \n    POD2 --> PV\n    POD4 --> PV\n    \n    style API fill:#326ce5,color:#fff\n    style ETCD fill:#326ce5,color:#fff\n    style POD1 fill:#4caf50,color:#fff\n    style POD2 fill:#2196f3,color:#fff\n    style POD3 fill:#4caf50,color:#fff\n    style POD4 fill:#2196f3,color:#fff"
        },
        {
          "id": "cicd-pipeline",
          "definition": "flowchart TD\n    A[Developer Push Code] --> B[GitHub Webhook Trigger]\n    B --> C[CI Pipeline Starts]\n    \n    subgraph \"Continuous Integration\"\n        C --> D[Checkout Code]\n        D --> E[Run Linters]\n        E --> F[Run Unit Tests]\n        F --> G[Run Integration Tests]\n        G --> H[Build Docker Image]\n        H --> I[Security Scan - Trivy]\n        I --> J{All Checks Pass?}\n    end\n    \n    J -->|No| K[Notify Developer]\n    K --> L[Fix Issues]\n    L --> A\n    \n    J -->|Yes| M[Push to ECR]\n    \n    subgraph \"Continuous Deployment\"\n        M --> N{Target Environment?}\n        N -->|Dev| O[Auto Deploy to Dev]\n        N -->|Staging| P[Auto Deploy to Staging]\n        N -->|Production| Q{Manual Approval?}\n\n        Q -->|Approved| R[Canary Deployment]\n        R --> S[Monitor Metrics]\n        S --> T{Healthy?}\n        T -->|Yes| U[Complete Rollout]\n        T -->|No| V[Auto Rollback]\n\n        Q -->|Rejected| W[Hold Deployment]\n    end\n    \n    U --> X[Update Monitoring]\n    O --> X\n    P --> X\n    X --> Y[Notify Team - Slack]\n    \n    V --> Z[Alert On-Call]\n    \n    style J fill:#ff9800,color:#fff\n    style M fill:#4caf50,color:#fff\n    style U fill:#4caf50,color:#fff\n    style V fill:#f44336,color:#fff\n    style T fill:#ff9800,color:#fff"
        },
        {
          "id": "multi-stage-deploy",
          "definition": "flowchart LR\n    subgraph \"Development Branch\"\n        CODE[Code Push]\n        CI[CI Pipeline]\n        DEV[Deploy to Dev]\n    end\n    \n    subgraph \"Pull Request to Main\"\n        PR[Create PR]\n        REVIEW[Code Review]\n        TESTS[Integration Tests]\n    end\n    \n    subgraph \"Main Branch\"\n        MERGE[Merge to Main]\n        STAGING[Deploy to Staging]\n        SMOKE[Smoke Tests]\n    end\n    \n    subgraph \"Production Release\"\n        TAG[Git Tag/Release]\n        APPROVAL[Manual Approval]\n        CANARY[Canary Deployment<br/>10% traffic]\n        MONITOR[Monitor Metrics<br/>5 minutes]\n        DECISION{Healthy?}\n        FULL[Full Deployment<br/>100% traffic]\n        ROLLBACK[Auto Rollback]\n    end\n    \n    CODE --> CI\n    CI --> DEV\n    DEV --> PR\n    PR --> REVIEW\n    REVIEW --> TESTS\n    TESTS --> MERGE\n    MERGE --> STAGING\n    STAGING --> SMOKE\n    SMOKE --> TAG\n    TAG --> APPROVAL\n    APPROVAL --> CANARY\n    CANARY --> MONITOR\n    MONITOR --> DECISION\n    DECISION -->|Yes| FULL\n    DECISION -->|No| ROLLBACK\n    \n    style DEV fill:#4caf50,color:#fff\n    style STAGING fill:#ff9800,color:#fff\n    style CANARY fill:#2196f3,color:#fff\n    style FULL fill:#4caf50,color:#fff\n    style ROLLBACK fill:#f44336,color:#fff"
        },
        {
          "id": "testing-pyramid",
          "definition": "graph TB\n    subgraph \"Testing Pyramid\"\n        E2E[End-to-End Tests<br/>10% - Slow, Expensive<br/>Selenium, Cypress]\n        INT[Integration Tests<br/>20% - Medium Speed<br/>API Tests, Database Tests]\n        UNIT[Unit Tests<br/>70% - Fast, Cheap<br/>pytest, Jest, JUnit]\n\n        E2E --> INT\n        INT --> UNIT\n    end\n    \n    subgraph \"Test Types in CI/CD\"\n        LINT[Linting & Formatting<br/>ESLint, Pylint, Black]\n        STATIC[Static Analysis<br/>SonarQube, CodeQL]\n        SEC[Security Scanning<br/>Trivy, Snyk, OWASP]\n        PERF[Performance Tests<br/>k6, JMeter]\n        SMOKE[Smoke Tests<br/>Basic Health Checks]\n    end\n    \n    subgraph \"CI Pipeline Flow\"\n        COMMIT[Git Commit] --> LINT\n        LINT --> UNIT\n        UNIT --> STATIC\n        STATIC --> INT\n        INT --> SEC\n        SEC --> BUILD[Build Docker Image]\n        BUILD --> SMOKE\n        SMOKE --> E2E\n        E2E --> DEPLOY[Deploy to Staging]\n        DEPLOY --> PERF\n    end\n    \n    style UNIT fill:#4caf50,color:#fff\n    style INT fill:#ff9800,color:#fff\n    style E2E fill:#f44336,color:#fff\n    style BUILD fill:#2196f3,color:#fff"
        },
        {
          "id": "gitops-flow",
          "definition": "flowchart TB\n    subgraph \"Developer Workflow\"\n        DEV[Developer]\n        CODE[Source Code]\n        MANIFEST[K8s Manifests/Helm Charts]\n    end\n    \n    subgraph \"Git Repository\"\n        APP_REPO[App Repo]\n        CONFIG_REPO[Config/GitOps Repo]\n    end\n    \n    subgraph \"CI Pipeline\"\n        CI[CI]\n        BUILD[Build]\n        IMAGE[Image]\n        ECR[AWS ECR]\n    end\n    \n    subgraph \"GitOps Operator\"\n        ARGO[ArgoCD]\n        SYNC[Sync Controller]\n        HEALTH[Health Monitor]\n    end\n    \n    subgraph \"Kubernetes Cluster\"\n        K8S[Kubernetes]\n        PODS[Pods]\n        SVC[Services]\n    end\n    \n    subgraph \"Monitoring\"\n        PROM[Prometheus]\n        SLACK[Slack Notifications]\n    end\n    \n    DEV --> CODE\n    DEV --> MANIFEST\n    CODE --> APP_REPO\n    MANIFEST --> CONFIG_REPO\n    \n    APP_REPO --> CI\n    CI --> BUILD\n    BUILD --> IMAGE\n    IMAGE --> ECR\n    \n    CONFIG_REPO --> ARGO\n    ARGO --> SYNC\n    SYNC --> K8S\n    SYNC --> HEALTH\n    \n    K8S --> PODS\n    K8S --> SVC\n    \n    HEALTH --> PROM\n    ARGO --> SLACK\n    \n    SYNC -.->|Pull Changes| CONFIG_REPO\n    SYNC -.->|Watch for Updates| ECR\n    \n    style ARGO fill:#ff6b35,color:#fff\n    style CONFIG_REPO fill:#4caf50,color:#fff\n    style SYNC fill:#2196f3,color:#fff\n    style K8S fill:#326ce5,color:#fff"
        },
        {
          "id": "policy-as-code",
          "definition": "flowchart TB\n    subgraph \"Development Phase\"\n        DEV[Developer]\n        LOCAL[Local Policy Check<br/>Pre-commit Hooks]\n        PR[Pull Request]\n    end\n    \n    subgraph \"CI/CD Pipeline\"\n        CHECKOV[Checkov - IaC Scan]\n        OPA[OPA/Conftest - Policy as Code]\n        TFSEC[tfsec - Terraform Scan]\n        KUBE[Kube-score / KubeLinter<br/>K8s Best Practices]\n        GATE[Policy Gate]\n    end\n    \n    subgraph \"Policy Decision\"\n        APPROVE[Approve & Merge]\n        BLOCK[Block & Notify]\n    end\n    \n    subgraph \"Runtime Enforcement\"\n        ADMISSION[Admission Controller]\n        RUNTIME[Runtime Enforcement]\n        ALLOW[Allow & Monitor]\n        DENY[Deny & Log]\n    end\n    \n    subgraph \"Continuous Monitoring\"\n        AUDIT[Audit Logs]\n        REPORT[Compliance Reports]\n        ALERT[Alert on Violations]\n    end\n    \n    DEV --> LOCAL\n    LOCAL --> PR\n    PR --> CHECKOV\n    PR --> OPA\n    PR --> TFSEC\n    PR --> KUBE\n    \n    CHECKOV --> GATE\n    OPA --> GATE\n    TFSEC --> GATE\n    KUBE --> GATE\n    \n    GATE -->|Yes| APPROVE\n    GATE -->|No| BLOCK\n    BLOCK --> DEV\n    \n    APPROVE --> DEPLOY\n    DEPLOY --> ADMISSION\n    ADMISSION --> RUNTIME\n    RUNTIME -->|Yes| ALLOW\n    RUNTIME -->|No| DENY\n    \n    ALLOW --> AUDIT\n    DENY --> AUDIT\n    AUDIT --> REPORT\n    AUDIT --> ALERT\n    \n    style GATE fill:#ff9800,color:#fff\n    style APPROVE fill:#4caf50,color:#fff\n    style BLOCK fill:#f44336,color:#fff\n    style ALLOW fill:#4caf50,color:#fff\n    style DENY fill:#f44336,color:#fff"
        },
        {
          "id": "observability",
          "definition": "graph TB\n    subgraph \"Application Layer\"\n        APP[App]\n        K8S[Kubernetes Cluster]\n    end\n    \n    subgraph \"Three Pillars of Observability\"\n        LOGS[Logs]\n        METRICS[Metrics]\n        TRACES[Traces]\n        APP --> LOGS\n        APP --> METRICS\n        APP --> TRACES\n    end\n    \n    subgraph \"Visualization & Alerting\"\n        GRAF[Grafana]\n        ALERT[Alertmanager]\n        PROM[Prometheus]\n        PROM --> ALERT\n    end\n    \n    subgraph \"Incident Response\"\n        PAGER[PagerDuty]\n        EMAIL[Email Alerts]\n        SLACK[Slack]\n        ALERT --> PAGER\n        ALERT --> EMAIL\n        ALERT --> SLACK\n    end\n    \n    subgraph \"AWS Native\"\n        CW[CloudWatch]\n        CW --> GRAF\n    end\n    \n    style PROM fill:#e6522c,color:#fff\n    style LOKI fill:#f46800,color:#fff\n    style JAEGER fill:#60d0e4,color:#000\n    style GRAF fill:#f46800,color:#fff\n    style ALERT fill:#ff6b6b,color:#fff"
        },
        {
          "id": "security-architecture",
          "definition": "graph TB\n    subgraph \"Identity & Access Management\"\n        IAM[IAM Users/Roles/Policies]\n        MFA[MFA Enforcement]\n        IAM --> MFA\n    end\n    \n    subgraph \"Secrets Management\"\n        SM[AWS Secrets Manager]\n        VAULT[HashiCorp Vault]\n        K8S_SEC[Kubernetes Secrets]\n        SM --> K8S_SEC\n        VAULT --> K8S_SEC\n    end\n    \n    subgraph \"Application Security\"\n        WAF[AWS WAF]\n        SHIELD[AWS Shield]\n        POLICIES[Security Policies]\n        APP[Application]\n        POLICIES --> APP\n    end\n    \n    subgraph \"Container Security\"\n        SCAN[Image Scanning]\n        ADMISSION[Admission Policies]\n        RUNTIME[Runtime Security]\n        REPORT[Vulnerability Report]\n        SCAN --> REPORT\n    end\n    \n    subgraph \"Network Security\"\n        SG[Security Groups]\n        NACL[NACL]\n        SG --> NACL\n    end\n    \n    subgraph \"Monitoring & Compliance\"\n        CONFIG[AWS Config]\n        CLOUDTRAIL[CloudTrail]\n        GUARD[GuardDuty]\n        SHUB[Security Hub]\n        CONFIG --> ALERT\n    end\n    \n    subgraph \"Encryption\"\n        KMS[KMS]\n        S3[S3 Encryption]\n        RDS[RDS Encryption]\n        TLS[TLS] \n        APP --> TLS\n    end\n    \n    ALERT --> INCIDENT[Incident Response]\n    \n    style IAM fill:#ff9900,color:#fff\n    style SM fill:#c925d1,color:#fff\n    style SCAN fill:#4caf50,color:#fff\n    style GD fill:#f44336,color:#fff\n    style KMS fill:#ff9900,color:#fff"
        },
        {
          "id": "serverless-architecture",
          "definition": "flowchart LR\n    subgraph \"User Interactions\"\n        USER[User]\n        WEB[Web App]\n        MOBILE[Mobile App]\n    end\n    \n    subgraph \"API Layer\"\n        APIGW[API Gateway]\n        REST[REST Endpoints]\n    end\n    \n    subgraph \"Event Sources\"\n        S3_EVENT[S3 Events]\n        SNS[SNS Notifications]\n        SQS[SQS Queue]\n        EB[EventBridge]\n        SCHED[CloudWatch Events]\n    end\n    \n    subgraph \"Lambda Functions\"\n        L1[Auth Service]\n        L2[File Processor]\n        L3[API Handler]\n        L4[Cron Worker]\n        L5[Analytics Processor]\n    end\n    \n    subgraph \"Data Storage\"\n        DDB[(DynamoDB)]\n        RDS[(RDS PostgreSQL)]\n        S3[(S3)]\n    end\n    \n    subgraph \"External Services\"\n        EMAIL[Email Service]\n        SMS[SMS Service - SNS]\n    end\n    \n    USER --> WEB\n    USER --> MOBILE\n    WEB --> APIGW\n    MOBILE --> APIGW\n    \n    APIGW --> REST\n    REST --> L1\n    REST --> L3\n    \n    S3_EVENT --> L2\n    SNS --> L1\n    SQS --> L5\n    EB --> L4\n    SCHED --> L4\n    \n    L1 --> DDB\n    L1 --> EMAIL\n    L1 --> SMS\n    \n    L2 --> S3\n    L3 --> DDB\n    L3 --> S3\n    \n    L4 --> DDB\n    L4 --> SNS\n    \n    L5 --> DDB\n    L5 --> RDS\n    \n    style APIGW fill:#ff4f8b,color:#fff\n    style L1 fill:#ff9900,color:#fff\n    style L2 fill:#ff9900,color:#fff\n    style L3 fill:#ff9900,color:#fff\n    style L4 fill:#ff9900,color:#fff\n    style L5 fill:#ff9900,color:#fff\n    style DDB fill:#4053d6,color:#fff"
        },

        {
          "id": "testing-pyramid",
          "definition": "graph TB\n    subgraph \"Testing Pyramid\"\n        E2E[End-to-End Tests<br/>10% - Slow, Expensive<br/>Selenium, Cypress]\n        INT[Integration Tests<br/>20% - Medium Speed<br/>API Tests, Database Tests]\n        UNIT[Unit Tests<br/>70% - Fast, Cheap<br/>pytest, Jest, JUnit]\n\n        E2E --> INT\n        INT --> UNIT\n    end\n    \n    subgraph \"Test Types in CI/CD\"\n        LINT[Linting & Formatting<br/>ESLint, Pylint, Black]\n        STATIC[Static Analysis<br/>SonarQube, CodeQL]\n        SEC[Security Scanning<br/>Trivy, Snyk, OWASP]\n        PERF[Performance Tests<br/>k6, JMeter]\n        SMOKE[Smoke Tests<br/>Basic Health Checks]\n    end\n    \n    subgraph \"CI Pipeline Flow\"\n        COMMIT[Git Commit] --> LINT\n        LINT --> UNIT\n        UNIT --> STATIC\n        STATIC --> INT\n        INT --> SEC\n        SEC --> BUILD[Build Docker Image]\n        BUILD --> SMOKE\n        SMOKE --> E2E\n        E2E --> DEPLOY[Deploy to Staging]\n        DEPLOY --> PERF\n    end\n    \n    style UNIT fill:#4caf50,color:#fff\n    style INT fill:#ff9800,color:#fff\n    style E2E fill:#f44336,color:#fff\n    style BUILD fill:#2196f3,color:#fff"
        },
        {
          "id": "gitops-workflow",
          "definition": "flowchart TB\n    subgraph \"Developer Workflow\"\n        DEV[Developer]\n        CODE[Code Changes]\n        MANIFEST[K8s Manifests/Helm Charts]\n    end\n    \n    subgraph \"Git Repository\"\n        APP_REPO[Application Repo]\n        CONFIG_REPO[Config/GitOps Repo]\n    end\n    \n    subgraph \"CI Pipeline\"\n        CI[GitHub Actions]\n        BUILD[Build & Test]\n        IMAGE[Docker Image]\n        ECR[AWS ECR]\n    end\n    \n    subgraph \"GitOps Operator\"\n        ARGO[ArgoCD / Flux CD]\n        SYNC[Sync Controller]\n        HEALTH[Health Monitor]\n    end\n    \n    subgraph \"Kubernetes Cluster\"\n        K8S[EKS Cluster]\n        PODS[Application Pods]\n        SVC[Services]\n    end\n    \n    subgraph \"Monitoring\"\n        PROM[Prometheus]\n        SLACK[Slack Notifications]\n    end\n    \n    DEV --> CODE\n    DEV --> MANIFEST\n    CODE --> APP_REPO\n    MANIFEST --> CONFIG_REPO\n    \n    APP_REPO --> CI\n    CI --> BUILD\n    BUILD --> IMAGE\n    IMAGE --> ECR\n    \n    CONFIG_REPO --> ARGO\n    ARGO --> SYNC\n    SYNC --> K8S\n    SYNC --> HEALTH\n    \n    K8S --> PODS\n    K8S --> SVC\n    \n    HEALTH --> PROM\n    ARGO --> SLACK\n    \n    SYNC -.->|Pull Changes| CONFIG_REPO\n    SYNC -.->|Watch for Updates| ECR\n    \n    style ARGO fill:#ff6b35,color:#fff\n    style CONFIG_REPO fill:#4caf50,color:#fff\n    style SYNC fill:#2196f3,color:#fff\n    style K8S fill:#326ce5,color:#fff"
        },
        {
          "id": "observability-stack",
          "definition": "graph TB\n    subgraph \"Application Layer\"\n        APP[CloudTask Application]\n        K8S[Kubernetes Cluster]\n    end\n    \n    subgraph \"Three Pillars of Observability\"\n        subgraph \"Metrics\"\n            PROM[Prometheus]\n            PROM_EXP[Node Exporter<br/>App Metrics]\n            APP --> PROM_EXP\n            K8S --> PROM_EXP\n            PROM_EXP --> PROM\n        end\n\n        subgraph \"Logs\"\n            LOKI[Grafana Loki]\n            FLUENT[Fluentd/Fluent Bit]\n            APP --> FLUENT\n            K8S --> FLUENT\n            FLUENT --> LOKI\n        end\n\n        subgraph \"Traces\"\n            JAEGER[Jaeger/X-Ray]\n            OTEL[OpenTelemetry]\n            APP --> OTEL\n            OTEL --> JAEGER\n        end\n    end\n    \n    subgraph \"Visualization & Alerting\"\n        GRAF[Grafana Dashboards]\n        ALERT[Alert Manager]\n\n        PROM --> GRAF\n        LOKI --> GRAF\n        JAEGER --> GRAF\n\n        PROM --> ALERT\n    end\n    \n    subgraph \"Incident Response\"\n        ALERT --> SLACK[Slack Notifications]\n        ALERT --> PAGE[PagerDuty]\n        ALERT --> EMAIL[Email Alerts]\n    end\n    \n    subgraph \"AWS Native\"\n        CW[CloudWatch]\n        APP --> CW\n        K8S --> CW\n        CW --> GRAF\n    end\n    \n    style PROM fill:#e6522c,color:#fff\n    style LOKI fill:#f46800,color:#fff\n    style JAEGER fill:#60d0e4,color:#000\n    style GRAF fill:#f46800,color:#fff\n    style ALERT fill:#ff6b6b,color:#fff"
        },
        {
          "id": "compliance-frameworks",
          "definition": "graph TB\n    subgraph \"Identity & Access Management\"\n        IAM[AWS IAM]\n        ROLES[IAM Roles]\n        POLICIES[Least Privilege Policies]\n        MFA[Multi-Factor Auth]\n\n        IAM --> ROLES\n        IAM --> POLICIES\n        IAM --> MFA\n    end\n    \n    subgraph \"Secrets Management\"\n        SM[AWS Secrets Manager]\n        VAULT[HashiCorp Vault]\n        K8S_SEC[Kubernetes Secrets]\n        ROTATE[Auto Rotation]\n\n        SM --> ROTATE\n        VAULT --> K8S_SEC\n    end\n    \n    subgraph \"Application Security\"\n        APP[CloudTask App]\n        APP --> SM\n        APP --> K8S_SEC\n        POLICIES --> APP\n    end\n    \n    subgraph \"Container Security\"\n        SCAN[Trivy Scanner]\n        ECR[AWS ECR]\n        IMG[Docker Images]\n\n        IMG --> SCAN\n        SCAN --> ECR\n        SCAN --> REPORT[Vulnerability Report]\n    end\n    \n    subgraph \"Network Security\"\n        SG[Security Groups]\n        NACL[Network ACLs]\n        WAF[AWS WAF]\n\n        WAF --> SG\n        SG --> NACL\n    end\n    \n    subgraph \"Monitoring & Compliance\"\n        GD[GuardDuty]\n        SH[Security Hub]\n        CONFIG[AWS Config]\n\n        APP --> GD\n        ECR --> SH\n        IAM --> CONFIG\n\n        GD --> ALERT[Security Alerts]\n        SH --> ALERT\n        CONFIG --> ALERT\n    end\n    \n    subgraph \"Encryption\"\n        KMS[AWS KMS]\n        TLS[TLS/SSL Certificates]\n\n        SM --> KMS\n        APP --> TLS\n    end\n    \n    ALERT --> INCIDENT[Incident Response]\n    \n    style IAM fill:#ff9900,color:#fff\n    style SM fill:#c925d1,color:#fff\n    style SCAN fill:#4caf50,color:#fff\n    style GD fill:#f44336,color:#fff\n    style KMS fill:#ff9900,color:#fff"
        }
        
      ]
    };

    console.log(`Loaded ${data.charts.length} embedded chart definitions`);

    // Use the embedded chart definitions
    let charts = Array.isArray(data) ? data : (Array.isArray(data?.charts) ? data.charts : []);

    // Strategy: Find placeholders with data-chart-id or .mermaid blocks in order
    // Prefer explicit placeholders: <div class="mermaid" data-chart-id="architecture"></div>
    const placeholders = Array.from(document.querySelectorAll('.mermaid'));

    if (charts.length > 0 && placeholders.length > 0) {
      // Create a map for quick lookup
      const byId = new Map(charts.map(c => [c.id, c.definition]));

      // First, let's log what we're working with
      console.log(`Found ${placeholders.length} mermaid placeholders and ${charts.length} chart definitions`);

      // Create a function to clean up diagram definitions to ensure proper formatting
      const cleanDefinition = (def) => {
        // Make sure the definition is properly formatted for Mermaid
        if (!def.trim()) return '';
        return def.trim();
      };

      // Process each placeholder
      placeholders.forEach((el, idx) => {
        const cid = el.getAttribute('data-chart-id');

        // If this element has a chart ID, use the embedded definition
        if (cid && byId.has(cid)) {
          console.log(`Setting chart content for ${cid}`);

          // Get the definition and clean it up
          const definition = cleanDefinition(byId.get(cid));

          // Clear the element first
          el.innerHTML = '';

          // Set the content
          el.textContent = definition;

        } else if (!cid) {
          // Element without a chart ID - might have inline definition or need a fallback
          const inlineContent = el.textContent.trim();

          if (inlineContent.length > 0) {
            // This already has an inline definition, leave it as is
            console.log(`Found unnamed chart with inline definition`);
            // Still need to clean it up to ensure proper rendering
            el.setAttribute('data-chart-id', `inline-chart-${idx}`);
          } else if (charts[idx]) {
            // Fallback: order-based mapping for elements without ID or content
            console.log(`Setting content for unnamed chart to ${charts[idx].id}`);

            // Set the ID and content
            el.setAttribute('data-chart-id', charts[idx].id);
            el.textContent = cleanDefinition(charts[idx].definition);
          }
        } else if (cid && !byId.has(cid)) {
          console.warn(`Warning: Chart ID "${cid}" not found in chart definitions`);
        }
      });
    }

    console.log("Running Mermaid renderer...");
    try {
      // Use a more reliable approach to render each diagram individually
      const diagrams = document.querySelectorAll('.mermaid');
      console.log(`Attempting to render ${diagrams.length} diagrams`);

      // Initialize Mermaid again with full configuration
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#8B5CF6',
          primaryTextColor: '#f1f5f9',
          primaryBorderColor: '#8B5CF6',
          lineColor: '#8B5CF6',
          secondaryColor: '#10b981',
          tertiaryColor: '#f59e0b',
          background: '#000000',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569',
          textColor: '#f1f5f9',
          nodeBorder: '#8B5CF6',
          clusterBkg: '#0D0D0D',
          clusterBorder: '#2A2A2A',
          defaultLinkColor: '#8B5CF6',
          titleColor: '#f1f5f9',
          edgeLabelBackground: '#1e293b',
        },
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      });

      // Manual rendering of each diagram
      for (const diagram of diagrams) {
        const id = diagram.getAttribute('data-chart-id') || 'unnamed';
        try {
          console.log(`Rendering diagram: ${id}`);

          // Ensure the diagram has content
          const content = diagram.textContent.trim();
          if (content.length > 0) {
            // Generate a unique ID for this render
            const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

            try {
              // Render the diagram
              const { svg, bindFunctions } = await window.mermaid.render(uniqueId, content);

              // Apply the SVG
              diagram.innerHTML = svg;

              // Apply any bind functions
              if (bindFunctions) bindFunctions(diagram);

              // Add a custom class to help with styling
              diagram.classList.add('mermaid-rendered');

              console.log(`Successfully rendered: ${id}`);
            } catch (renderError) {
              console.error(`Error rendering diagram ${id}:`, renderError);

              // Leave a placeholder with error information
              diagram.innerHTML = `
                <div class="mermaid-error">
                  <p>Failed to render diagram: ${id}</p>
                  <pre>${renderError.message || 'Unknown error'}</pre>
                </div>
              `;
            }
          } else {
            console.warn(`Empty diagram content for: ${id}`);
          }
        } catch (err) {
          console.error(`Failed to process diagram ${id}:`, err);
        }
      }

      console.log("Mermaid charts rendering completed");

      // Reorder SVG elements for better label layering
      fixMermaidSvgLayering();

      // Extract phase positions from gantt chart after rendering
      getPhasePositionsAfterRender();

      // Hide loading screen once charts are rendered
      hideLoadingScreen();
    } catch (renderErr) {
      console.error('Error rendering charts:', renderErr);
      hideLoadingScreen();
    }
  } catch (err) {
    console.error('Error loading charts:', err);

    // Even if charts.json fails (e.g., file:// origin), attempt to render inline mermaid blocks
    try {
      console.log("Attempting fallback rendering...");
      await window.mermaid.run();
      console.log("Fallback rendering succeeded");
      fixMermaidSvgLayering();
      getPhasePositionsAfterRender();
    } catch (innerErr) {
      console.error('Mermaid render fallback failed:', innerErr);
    } finally {
      hideLoadingScreen();
    }
  }
}

function fixMermaidSvgLayering() {
  document.querySelectorAll('.mermaid svg').forEach(svg => {
    const elementsToMoveOnTop = [];

    svg.querySelectorAll('g.edgeLabels, g.edgeLabel').forEach(el => elementsToMoveOnTop.push(el));
    svg.querySelectorAll('.commit-label, .branch-label').forEach(el => elementsToMoveOnTop.push(el));
    svg.querySelectorAll('g[class*="label"]:not(.cluster-label)').forEach(el => elementsToMoveOnTop.push(el));

    elementsToMoveOnTop.forEach(el => {
      const parent = el.parentNode;
      if (parent) parent.appendChild(el);
    });

    svg.querySelectorAll('g.clusters').forEach(clustersGroup => {
      const parent = clustersGroup.parentNode;
      if (parent) {
        const nodesGroup = parent.querySelector('g.nodes');
        if (nodesGroup) parent.insertBefore(clustersGroup, nodesGroup);
      }
      clustersGroup.querySelectorAll('g.cluster').forEach(cluster => {
        const clusterLabel = cluster.querySelector('g.cluster-label');
        if (clusterLabel) cluster.appendChild(clusterLabel);
      });
    });

    svg.querySelectorAll('g.nodes').forEach(nodesGroup => {
      const parent = nodesGroup.parentNode;
      if (parent) parent.appendChild(nodesGroup);
    });

    svg.querySelectorAll('g.cluster-label .nodeLabel').forEach(label => {
      label.style.color = '#ffffff';
      label.style.fontWeight = '600';
    });

    // Fix for specific node labels that have black text color
    svg.querySelectorAll('.nodeLabel').forEach(label => {
      // Check if the color is black or close to black
      const style = window.getComputedStyle(label);
      const color = style.color;

      // If color is black or dark, change it to white
      if (color === 'rgb(0, 0, 0)' ||
        color === '#000' ||
        color === 'black' ||
        color.includes('rgba(0, 0, 0') ||
        label.style.color === '#000' ||
        label.style.color === 'black') {
        label.style.color = '#f1f5f9';
      }

      // Specifically fix the Jaeger/X-Ray label if present
      if (label.textContent.includes('Jaeger') ||
        label.textContent.includes('X-Ray')) {
        label.style.color = '#f1f5f9';
      }
    });

    svg.querySelectorAll('g.edgeLabels').forEach(edgeLabelsGroup => {
      const parent = edgeLabelsGroup.parentNode;
      if (parent) parent.appendChild(edgeLabelsGroup);
    });
  });
}

// Function removed to simplify - keeping only the layer fixes

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;
  loadingScreen.classList.add('fade-out');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}

// Function to get phase positions after charts are fully rendered
function getPhasePositionsAfterRender() {
  // Wait a little bit to ensure charts are completely rendered
  setTimeout(() => {
    try {
      // Look for the timeline chart
      const timelineChart = document.querySelector('.mermaid[data-chart-id="timeline"] svg');
      if (!timelineChart) return;

      // Find all phase nodes in the flowchart (p1, p2, p3, etc.)
      const phaseElements = timelineChart.querySelectorAll('[id*="flowchart-p"]');
      if (!phaseElements.length) {
        console.log('No phase elements found in timeline chart');
        return;
      }

      // Create an object to store phase positions
      const phasePositions = {};

      // For each phase element, extract its position and dimensions
      phaseElements.forEach(phaseElement => {
        // Extract phase number from the ID (assuming format with p1, p2, etc.)
        const idParts = phaseElement.id.split('-');
        const phaseId = idParts[idParts.length - 1]; // Get the last part (p1, p2, etc.)
        const phaseNumber = phaseId.replace('p', ''); // Extract just the number

        // Skip if we can't extract a phase number
        if (!phaseNumber) return;

        const rect = phaseElement.getBoundingClientRect();
        const chartRect = timelineChart.getBoundingClientRect();

        // Store position relative to the chart and absolute position
        phasePositions[`phase${phaseNumber}`] = {
          id: `phase${phaseNumber}`,
          number: parseInt(phaseNumber),
          relativeLeft: rect.left - chartRect.left,
          relativeTop: rect.top - chartRect.top,
          width: rect.width,
          height: rect.height,
          absoluteLeft: rect.left,
          absoluteTop: rect.top,
          absoluteRight: rect.right,
          absoluteBottom: rect.bottom
        };
      });

      // Store the phase positions in a global variable and dispatch an event
      window.roadmapPhasePositions = phasePositions;

      // Create a custom event to notify that phase positions are ready
      const event = new CustomEvent('phasesRendered', {
        detail: { phasePositions }
      });
      document.dispatchEvent(event);

      console.log('Phase positions extracted:', phasePositions);

      // Update any navigation links or UI elements that need phase positions
      updatePhaseNavigationLinks(phasePositions);

    } catch (error) {
      console.error('Error getting phase positions:', error);
    }
  }, 1000); // Wait 1 second to ensure rendering is complete
}

// Function to update navigation links or other UI elements with phase positions
function updatePhaseNavigationLinks(phasePositions) {
  // Get all elements with data-phase-target attribute
  const phaseLinks = document.querySelectorAll('[data-phase-target]');

  phaseLinks.forEach(link => {
    const phaseTarget = link.getAttribute('data-phase-target');
    const phaseData = phasePositions[phaseTarget];

    if (phaseData) {
      // Store position data in the link for quick access
      link.setAttribute('data-phase-position', JSON.stringify({
        top: phaseData.absoluteTop,
        left: phaseData.absoluteLeft
      }));

      // Add a click handler if not already present
      if (!link.getAttribute('data-phase-listener-added')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();

          // Get the latest position data (in case the page was resized)
          const posData = JSON.parse(link.getAttribute('data-phase-position') || '{}');
          const timeline = document.querySelector('.mermaid[data-chart-id="timeline"]');

          if (timeline && posData.top) {
            // Scroll to the phase position with a slight offset for better visibility
            window.scrollTo({
              top: posData.top - 100, // 100px offset from top
              behavior: 'smooth'
            });

            // Optional: highlight the phase briefly
            const phaseNumber = phaseTarget.replace('phase', '');
            const phaseEl = document.querySelector(`[id*="flowchart-p${phaseNumber}"]`);
            if (phaseEl) {
              phaseEl.classList.add('phase-highlight');
              setTimeout(() => phaseEl.classList.remove('phase-highlight'), 2000);
            }
          }
        });

        link.setAttribute('data-phase-listener-added', 'true');
      }
    }
  });
}

// ---------------- UI Logic moved from inline script ----------------

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const toc = document.getElementById('toc');
  if (sidebar && toc && sidebarToggle) {
    sidebar.classList.toggle('closed');
    toc.classList.toggle('hidden');
    sidebarToggle.textContent = sidebar.classList.contains('closed') ? '☰' : '×';
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('closed'));
  }
}

// Modal helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'block';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Expose functions for inline onclick handlers
window.toggleSidebar = toggleSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
window.getPhasePosition = function (phaseId) {
  return window.roadmapPhasePositions ? window.roadmapPhasePositions[phaseId] : null;
};

// Window resize handler to update phase positions
window.addEventListener('resize', debounce(() => {
  // Only recalculate if phases were already rendered
  if (window.roadmapPhasePositions) {
    getPhasePositionsAfterRender();
  }
}, 250));

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Function to make mermaid diagrams responsive
function makeMermaidResponsive() {
  const diagrams = document.querySelectorAll('.mermaid');
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  
  diagrams.forEach(diagram => {
    // Always ensure diagram has proper overflow handling
    diagram.style.overflow = 'auto';
    diagram.style.overflowY = 'hidden'; // Prevent vertical scrollbars
    diagram.style.webkitOverflowScrolling = 'touch'; // Smooth scrolling on iOS
    
    // Mobile-specific styles
    if (isMobile) {
      // For very small screens
      if (isSmallMobile) {
        // Container styles - make it full width but with proper overflow
        diagram.style.width = 'calc(100% - 20px)';
        diagram.style.maxWidth = 'calc(100% - 20px)';
        diagram.style.margin = '20px auto';
        diagram.style.position = 'relative';
        diagram.style.left = '0';
        diagram.style.transform = 'none';
        diagram.style.padding = '0 10px';
        diagram.style.boxSizing = 'border-box';
      } else {
        diagram.style.width = '100%';
        diagram.style.maxWidth = '100%';
        diagram.style.margin = '20px 0';
        diagram.style.padding = '0';
      }
    } else {
      diagram.style.maxWidth = '100%';
    }
    
    // Find SVG within the diagram
    const svg = diagram.querySelector('svg');
    if (svg) {
      // Reset min-width that might cause overflow issues
      svg.style.minWidth = '0';
      svg.style.height = 'auto';
      
      // Ensure SVG is properly sized
      if (isSmallMobile) {
        // For small mobile, ensure the diagram fits but allows scrolling if needed
        svg.style.maxWidth = '100%';
        svg.style.margin = '0 auto';
        svg.style.display = 'block';
      } else {
        // On larger screens, constrain to container
        svg.style.maxWidth = '100%';
      }
      
      // Make sure viewBox is set for proper scaling
      if (!svg.getAttribute('viewBox') && svg.getAttribute('width') && svg.getAttribute('height')) {
        const width = parseFloat(svg.getAttribute('width'));
        const height = parseFloat(svg.getAttribute('height'));
        if (width && height) {
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }
      }
    }
  });
}

// DOMContentLoaded setup
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Restore sidebar state
    const sidebar = document.getElementById('sidebar');
    const toc = document.getElementById('toc');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closed = localStorage.getItem('sidebarClosed') === 'true';
    if (closed && sidebar && toc && sidebarToggle) {
      sidebar.classList.add('closed');
      toc.classList.add('hidden');
      sidebarToggle.textContent = '☰';
    }

    // Replace emoji shortcodes like :sparkles: with Unicode
    document.body.innerHTML = document.body.innerHTML
      .replace(/:sparkles:/g, '✨')
      .replace(/:rocket:/g, '🚀')
      .replace(/:warning:/g, '⚠️')
      .replace(/:white_check_mark:/g, '✅')
      .replace(/:x:/g, '❌');

    // Add devicon icons for tech badges
    document.querySelectorAll('.tech-icon[data-icon]').forEach(el => {
      const icon = el.getAttribute('data-icon');
      if (icon) el.innerHTML = `<i class="devicon-${icon}"></i>`;
    });

    // Wrap tables for horizontal scroll on small screens
    document.querySelectorAll('table').forEach(table => {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Reading progress bar with smooth animation and throttled updates
    const progressBar = document.getElementById('reading-progress-bar');
    const progressPercent = document.getElementById('reading-progress-percent');

    if (progressBar || progressPercent) {
      // Variables for smoothing progress updates
      let lastProgress = 0;
      let targetProgress = 0;
      let animationFrameId = null;
      let lastScrollTime = 0;
      const throttleDelay = 100; // ms between progress updates

      // Use requestAnimationFrame for smoother visual updates
      const updateProgressBar = () => {
        // Smooth progress with easing - progress moves 20% toward target each frame
        lastProgress = lastProgress + (targetProgress - lastProgress) * 0.2;
        const roundedProgress = Math.round(lastProgress);

        if (progressBar) {
          progressBar.style.width = `${lastProgress}%`;
        }

        if (progressPercent) {
          // Only update the text when the rounded value changes
          if (progressPercent.textContent !== `${roundedProgress}%`) {
            progressPercent.textContent = `${roundedProgress}%`;
          }

          // Show progress percent when scrolled, hide at the top
          if (roundedProgress > 2) {
            progressPercent.classList.remove('hidden');
          } else {
            progressPercent.classList.add('hidden');
          }
        }

        // Continue animation if we're not close enough to target
        if (Math.abs(targetProgress - lastProgress) > 0.1) {
          animationFrameId = requestAnimationFrame(updateProgressBar);
        }
      };

      // Throttled scroll handler
      const onScroll = () => {
        const now = Date.now();

        // Throttle updates to prevent too many calculations
        if (now - lastScrollTime < throttleDelay) return;
        lastScrollTime = now;

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        targetProgress = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;

        // Cancel any existing animation frame and start a new one
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(updateProgressBar);
      };

      // Use passive event listener for better performance
      window.addEventListener('scroll', onScroll, { passive: true });

      // Initial calculation
      onScroll();
    }

    // Checklist persistence
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach((checkbox, idx) => {
      const key = `checklist_${idx}`;
      const saved = localStorage.getItem(key);
      if (saved !== null) checkbox.checked = saved === 'true';
      checkbox.addEventListener('change', () => {
        localStorage.setItem(key, checkbox.checked.toString());
      });
    });
    
    // Make mermaid diagrams responsive
    makeMermaidResponsive();
    
    // Handle window resize for mermaid diagrams
    window.addEventListener('resize', debounce(makeMermaidResponsive, 250));

  } catch (e) {
    console.error('Initialization error:', e);
  }
});

// UI Control Functions - Moved from HTML
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const body = document.body;
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.toggle('closed');
  toggle.classList.toggle('sidebar-closed');
  body.classList.toggle('sidebar-closed');

  // Ensure proper z-index and visibility on mobile
  if (window.innerWidth <= 768) {
    overlay.classList.toggle('show');
    
    // Fix sidebar positioning
    if (!sidebar.classList.contains('closed')) {
      sidebar.style.left = '0';
      sidebar.setAttribute('tabindex', '-1');
      sidebar.focus();
      document.body.style.overflow = 'hidden'; // Prevent body scrolling when sidebar is open
    } else {
      sidebar.style.left = '-100%';
      document.body.style.overflow = ''; // Restore body scrolling when sidebar is closed
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const body = document.body;
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.add('closed');
  toggle.classList.add('sidebar-closed');
  body.classList.add('sidebar-closed');
  overlay.classList.remove('show');
  
  // Restore body scrolling
  document.body.style.overflow = '';
}

// Close sidebar on mobile when clicking overlay
document.getElementById('sidebarOverlay')?.addEventListener('click', function () {
  if (window.innerWidth <= 768) {
    toggleSidebar();
  }
});

// Handle window resize
window.addEventListener('resize', function () {
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay && window.innerWidth > 768) {
    overlay.classList.remove('show');
  }
});

// Initialize sidebar state based on screen size
window.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 768) {
    closeSidebar();
  }

  // Close sidebar on mobile when clicking a navigation link
  const sidebarLinks = document.querySelectorAll('.sidebar-content a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });
});

// Close sidebar and modals with Escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (window.innerWidth <= 768 || document.getElementById('sidebar')?.classList.contains('closed') === false) {
      closeSidebar();
    }
    closeStuckModal();
    closeCommunityModal();
  }
});

// Modal functions
function openStuckModal() {
  const modal = document.getElementById('stuckModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeStuckModal() {
  const modal = document.getElementById('stuckModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

function openCommunityModal() {
  const modal = document.getElementById('communityModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    closeSidebar(); // Close sidebar when opening modal
  }
}

function closeCommunityModal() {
  const modal = document.getElementById('communityModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

function openCostModal() {
  const modal = document.getElementById('costModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    closeSidebar(); // Close sidebar when opening modal
  }
}

function closeCostModal() {
  const modal = document.getElementById('costModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Close modals when clicking outside content
window.onclick = function (event) {
  const stuckModal = document.getElementById('stuckModal');
  const communityModal = document.getElementById('communityModal');
  const costModal = document.getElementById('costModal');
  if (event.target === stuckModal) {
    closeStuckModal();
  }
  if (event.target === communityModal) {
    closeCommunityModal();
  }
  if (event.target === costModal) {
    closeCostModal();
  }
}

// Replace emojis with Font Awesome icons
document.addEventListener('DOMContentLoaded', function () {
  const emojiReplacements = {
    '✅': '<i class="fas fa-check-circle icon-emoji" style="color: #6EE7B7;"></i>',
    '❌': '<i class="fas fa-times-circle icon-emoji"></i>',
    '⚠️': '<i class="fas fa-exclamation-triangle icon-emoji"></i>',
    '💡': '<i class="fas fa-lightbulb icon-emoji"></i>',
    '🎯': '<i class="fas fa-bullseye icon-emoji"></i>',
    '📅': '<i class="far fa-calendar icon-emoji"></i>',
    '📚': '<i class="fas fa-book icon-emoji"></i>',
    '🧩': '<i class="fas fa-puzzle-piece icon-emoji"></i>',
    '💪': '<i class="fas fa-dumbbell icon-emoji"></i>',
    '🔥': '<i class="fas fa-fire icon-emoji"></i>',
    '⚡': '<i class="fas fa-bolt icon-emoji"></i>',
    '🚀': '<i class="fas fa-rocket icon-emoji"></i>',
    '📊': '<i class="fas fa-chart-bar icon-emoji"></i>',
    '🔒': '<i class="fas fa-lock icon-emoji"></i>',
    '🧑‍🤝‍🧑': '<i class="fas fa-users icon-emoji"></i>',
    '🛠️': '<i class="fas fa-tools icon-emoji"></i>',
    '💸': '<i class="fas fa-dollar-sign icon-emoji"></i>',
    '💰': '<i class="fas fa-money-bill-wave icon-emoji"></i>',
    '🤔': '<i class="fas fa-question-circle icon-emoji"></i>',
    '💻': '<i class="fas fa-laptop-code icon-emoji"></i>',
    '⏰': '<i class="fas fa-clock icon-emoji"></i>',
    '😫': '<i class="fas fa-tired icon-emoji"></i>',
    '🚫': '<i class="fas fa-ban icon-emoji"></i>',
    '📞': '<i class="fas fa-phone icon-emoji"></i>',
    '🌟': '<i class="fas fa-star icon-emoji"></i>',
    '🧭': '<i class="fas fa-compass icon-emoji"></i>',
    '🔀': '<i class="fas fa-code-branch icon-emoji"></i>',
    '☁️': '<i class="fas fa-cloud icon-emoji"></i>',
    '🧱': '<i class="fas fa-layer-group icon-emoji"></i>',
    '⚙️': '<i class="fas fa-cog icon-emoji"></i>',
    '🔁': '<i class="fas fa-sync icon-emoji"></i>',
    '🆘': '<i class="fas fa-life-ring icon-emoji"></i>',
    '📑': '<i class="fas fa-list icon-emoji"></i>',
    '🐧': '<i class="fab fa-linux icon-emoji"></i>',
    '🐳': '<i class="fab fa-docker icon-emoji"></i>',
    '☸️': '<i class="fas fa-dharmachakra icon-emoji"></i>',
    '🎓': '<i class="fas fa-graduation-cap icon-emoji"></i>',
    '📦': '<i class="fas fa-box icon-emoji"></i>',
    '📖': '<i class="fas fa-book-open icon-emoji"></i>',
    '📋': '<i class="fas fa-clipboard icon-emoji"></i>',
    '🤖': '<i class="fas fa-robot icon-emoji"></i>',
    '💼': '<i class="fas fa-briefcase icon-emoji"></i>',
    '📝': '<i class="fas fa-edit icon-emoji"></i>',
    '📍': '<i class="fas fa-map-marker-alt icon-emoji"></i>',
    '🎤': '<i class="fas fa-microphone icon-emoji"></i>',
    '🧪': '<i class="fas fa-flask icon-emoji"></i>',
    '🏗️': '<i class="fas fa-hammer icon-emoji"></i>',
    '🔄': '<i class="fas fa-sync-alt icon-emoji"></i>'
  };

  // Replace emojis in all text nodes
  function replaceEmojis(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let hasEmoji = false;

      for (let [emoji, icon] of Object.entries(emojiReplacements)) {
        if (text.includes(emoji)) {
          hasEmoji = true;
          break;
        }
      }

      if (hasEmoji) {
        let newHTML = text;
        for (let [emoji, icon] of Object.entries(emojiReplacements)) {
          newHTML = newHTML.split(emoji).join(icon);
        }

        const span = document.createElement('span');
        span.innerHTML = newHTML;
        node.parentNode.replaceChild(span, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE &&
      node.tagName !== 'SCRIPT' &&
      node.tagName !== 'STYLE' &&
      !node.classList.contains('mermaid')) {
      Array.from(node.childNodes).forEach(child => replaceEmojis(child));
    }
  }

  replaceEmojis(document.body);
});

// Add tech icons to specific mentions
document.addEventListener('DOMContentLoaded', function () {
  const techIcons = {
    'GitHub': '<i class="devicon-github-original tech-icon icon-github"></i>',
    'GitLab': '<i class="devicon-gitlab-plain tech-icon icon-gitlab"></i>',
    'Docker': '<i class="devicon-docker-plain tech-icon icon-docker"></i>',
    'Kubernetes': '<i class="devicon-kubernetes-plain tech-icon icon-kubernetes"></i>',
    'Python': '<i class="devicon-python-plain tech-icon icon-python"></i>',
    'JavaScript': '<i class="devicon-javascript-plain tech-icon icon-javascript"></i>',
    'Node.js': '<i class="devicon-nodejs-plain tech-icon icon-nodejs"></i>',
    'React': '<i class="devicon-react-original tech-icon icon-react"></i>',
    'PostgreSQL': '<i class="devicon-postgresql-plain tech-icon icon-postgres"></i>',
    'Redis': '<i class="devicon-redis-plain tech-icon icon-redis"></i>',
    'Nginx': '<i class="devicon-nginx-original tech-icon icon-nginx"></i>',
    'Terraform': '<i class="devicon-terraform-plain tech-icon icon-terraform"></i>',
    'Ansible': '<i class="devicon-ansible-plain tech-icon icon-ansible"></i>',
    'Jenkins': '<i class="devicon-jenkins-plain tech-icon icon-jenkins"></i>',
    'Prometheus': '<i class="devicon-prometheus-original tech-icon icon-prometheus"></i>',
    'Grafana': '<i class="devicon-grafana-original tech-icon icon-grafana"></i>',
    'AWS': '<i class="devicon-amazonwebservices-original tech-icon icon-aws"></i>',
    'Linux': '<i class="devicon-linux-plain tech-icon icon-linux"></i>',
    'Git': '<i class="devicon-git-plain tech-icon icon-git"></i>',
    'VS Code': '<i class="devicon-vscode-plain tech-icon icon-vscode"></i>'
  };

  // Add icons to h4 elements that contain tech names
  document.querySelectorAll('h4, strong').forEach(element => {
    let text = element.textContent;
    let modified = false;

    for (let [tech, icon] of Object.entries(techIcons)) {
      // Only add icon if it's the main subject (at start or after colon/dash)
      const patterns = [
        new RegExp(`^${tech}:`, 'i'),
        new RegExp(`^${tech}\\s`, 'i'),
        new RegExp(`:\\s*${tech}\\s`, 'i')
      ];

      for (let pattern of patterns) {
        if (pattern.test(text) && !element.querySelector('.tech-icon')) {
          const newText = text.replace(pattern, match => {
            return icon + match;
          });
          if (newText !== text) {
            element.innerHTML = newText;
            modified = true;
            break;
          }
        }
      }
      if (modified) break;
    }
  });

  // Ensure loading screen is hidden after all content is processed
  checkAndHideLoader();
});

// Function to hide loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Add fade-out class to trigger CSS transition
    loadingScreen.classList.add('fade-out');
    // Ensure it's removed from DOM after transition
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.classList.remove('loading');
    }, 500);
  }
}

// Handle responsive progress indicators
function fixProgressIndicatorsForMobile() {
  const progressBar = document.getElementById('reading-progress-bar');
  const progressPercent = document.getElementById('reading-progress-percent');
  
  if (progressBar && progressPercent) {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      progressBar.style.height = '4px';
      progressPercent.style.fontSize = '12px';
      progressPercent.style.padding = '2px 6px';
    } else {
      progressBar.style.height = '6px';
      progressPercent.style.fontSize = '14px';
      progressPercent.style.padding = '4px 8px';
    }
  }
}

// Check if everything is loaded and hide loader
function checkAndHideLoader() {
  // Wait a bit for Mermaid to complete
  setTimeout(() => {
    const mermaidDiagrams = document.querySelectorAll('.mermaid');
    // Consider diagrams rendered if they have SVG or if device is mobile (for better mobile UX)
    const isMobile = window.innerWidth <= 768;
    const allRendered = Array.from(mermaidDiagrams).every(diagram => {
      return diagram.querySelector('svg') !== null || isMobile;
    });

    if (allRendered || mermaidDiagrams.length === 0 || isMobile) {
      hideLoadingScreen();
    } else {
      // Check again in 500ms
      setTimeout(checkAndHideLoader, 500);
    }
  }, 500);
}

// Fallback: Hide loading screen after max time (shorter on mobile)
setTimeout(() => {
  const isMobile = window.innerWidth <= 768;
  // Use shorter timeout on mobile for better UX
  hideLoadingScreen();
}, window.innerWidth <= 768 ? 5000 : 10000);

// Also hide on window load as final fallback
window.addEventListener('load', () => {
  // First immediate execution
  wrapTablesForResponsiveness();
  makeMermaidResponsive();
  fixProgressIndicatorsForMobile();
  
  // Handle loading screen differently on mobile vs desktop
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // On mobile, hide loading screen quickly for better UX
    setTimeout(() => {
      hideLoadingScreen();
      makeMermaidResponsive();
      wrapTablesForResponsiveness();
    }, 500);
  } else {
    // On desktop, give more time for diagrams to render
    setTimeout(() => {
      hideLoadingScreen();
      makeMermaidResponsive();
      wrapTablesForResponsiveness();
    }, 1000);
  }
});

// Fix progress indicators and responsiveness on resize
window.addEventListener('resize', debounce(() => {
  fixProgressIndicatorsForMobile();
  wrapTablesForResponsiveness();
  makeMermaidResponsive();
}, 250));

// Wrap all tables in responsive wrapper for mobile scrolling
function wrapTablesForResponsiveness() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    // Check if table is not already wrapped
    if (!table.parentElement.classList.contains('table-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      
      // Make sure min-width is removed
      table.style.minWidth = 'auto';
      
      // Set table-layout to auto to allow cell resizing
      table.style.tableLayout = 'auto';
      
      // Add proper overflow handling to wrapper
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitOverflowScrolling = 'touch';
      wrapper.style.width = '100%';
      wrapper.style.display = 'block';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Initial wrap of tables
  wrapTablesForResponsiveness();
  
  // Re-check for tables multiple times as content loads
  setTimeout(wrapTablesForResponsiveness, 1000);
  setTimeout(wrapTablesForResponsiveness, 2000);
  setTimeout(wrapTablesForResponsiveness, 5000);
});

// Reading Progress Bar with weighted phases
const phaseWeights = {
  'readiness-quiz': { weeks: 0, name: 'Prerequisites Assessment' },
  'quick-start': { weeks: 0, name: 'Quick Start Track (Optional)' },
  'project-architecture': { weeks: 0, name: 'Project Overview' },
  'project-alternatives': { weeks: 0, name: 'Project Alternatives' },
  'impact-statement': { weeks: 0, name: 'Impact Statement' },
  'prerequisites': { weeks: 0, name: 'Prerequisites' },
  'phase1': { weeks: 1, name: 'Phase 1: DevOps Fundamentals' },
  'phase2': { weeks: 2, name: 'Phase 2: Version Control' },
  'phase3': { weeks: 4, name: 'Phase 3: Linux & Networking' },
  'phase4': { weeks: 5, name: 'Phase 4: Cloud Infrastructure' },
  'phase5': { weeks: 2, name: 'Phase 5: Terraform IaC' },
  'phase6': { weeks: 4, name: 'Phase 6: Ansible' },
  'phase7': { weeks: 2, name: 'Phase 7: Docker' },
  'phase8': { weeks: 4, name: 'Phase 8: Kubernetes' },
  'phase9': { weeks: 3, name: 'Phase 9: CI/CD' },
  'phase9b': { weeks: 2, name: 'Phase 9B: GitOps' },
  'phase10': { weeks: 4, name: 'Phase 10: Monitoring' },
  'phase11': { weeks: 2, name: 'Phase 11: Security' },
  'phase12': { weeks: 4, name: 'Phase 12: Serverless' },
  'soft-skills': { weeks: 1, name: 'Soft Skills' },
  'cost-breakdown': { weeks: 0, name: 'Cost Breakdown' },
  'final-polish': { weeks: 8, name: 'Final Polish & Portfolio' },
  'career-tips': { weeks: 1, name: 'Career Tips' },
  'final-thoughts': { weeks: 0, name: 'Final Thoughts' }
};

// Calculate total weeks (only count phases with actual time investment)
const totalWeeks = Object.values(phaseWeights).reduce((sum, phase) => sum + phase.weeks, 0);

function getElementOffset(element) {
  if (!element) {
    console.warn('getElementOffset called with null/undefined element');
    return NaN;
  }

  try {
    // Use getBoundingClientRect for more reliable positioning
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  } catch (error) {
    console.error('Error getting element offset:', error);
    return NaN;
  }
}

// Utility clamp helper
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

// ---------- REPLACED: simplified per-tick phase-weighted progress calculation ----------
/*
  Algorithm:
   - Find H2/H3 anchors for phases (fresh each call)
   - Find phase1Start Y
   - If before phase1Start => 0%
   - Else find current phase segment and progressInSegment
   - accumulatedWeight = sum(weights before current) + progressInSegment * currentWeight
   - percent = (accumulatedWeight / totalWeeks) * 100
   - fallback to position fraction if totalWeeks == 0
   - small smoothing applied to avoid jumps
*/
function updateProgressBar() {
  try {
    const progressBar = document.getElementById('reading-progress-bar');
    const progressPercent = document.getElementById('reading-progress-percent');
    if (!progressBar || !progressPercent) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const documentEnd = Math.max(documentHeight - windowHeight, 0);

    // Build phase anchors fresh (H2/H3 elements)
    const phaseIds = Object.keys(phaseWeights);
    const phases = [];
    for (let i = 0; i < phaseIds.length; i++) {
      const id = phaseIds[i];
      const el = document.querySelector(`h2#${id}, h3#${id}`);
      if (el) {
        const top = getElementOffset(el);
        phases.push({ id, top, weight: phaseWeights[id].weeks || 0, name: phaseWeights[id].name });
      }
    }

    // fallback to simple global percent when no anchors
    if (phases.length === 0) {
      const simple = documentEnd > 0 ? clamp((scrollTop / documentEnd) * 100, 0, 100) : 100;
      progressBar.style.width = `${Math.round(simple)}%`;
      progressPercent.textContent = `${Math.round(simple)}%`;
      progressPercent.classList.remove('hidden');
      window._lastProgressPercent = simple;
      return;
    }

    // sort anchors
    phases.sort((a, b) => a.top - b.top);

    // phase1 start Y (use explicit phase1 anchor if present)
    const phase1El = document.querySelector('h2#phase1, h3#phase1');
    const phase1Start = phase1El ? getElementOffset(phase1El) : phases[0].top;

    // if document too short or before phase1 => keep 0%
    if (documentEnd <= phase1Start + 1 || scrollTop < phase1Start) {
      progressBar.style.width = '0%';
      progressPercent.textContent = '0%';
      progressPercent.classList.add('hidden');
      window._lastProgressPercent = 0;
      return;
    }

    // if near bottom => 100%
    if (scrollTop >= documentEnd - 10) {
      progressBar.style.width = '100%';
      progressPercent.textContent = '100%';
      progressPercent.classList.remove('hidden');
      window._lastProgressPercent = 100;
      return;
    }

    // Consider only phases from phase1Start onward
    const phasesFromStart = phases.filter(p => p.top >= phase1Start);
    if (phasesFromStart.length === 0) {
      const simple = clamp((scrollTop - phase1Start) / (documentEnd - phase1Start) * 100, 0, 100);
      progressBar.style.width = `${Math.round(simple)}%`;
      progressPercent.textContent = `${Math.round(simple)}%`;
      progressPercent.classList.remove('hidden');
      window._lastProgressPercent = simple;
      return;
    }

    const totalWeeks = phasesFromStart.reduce((s, p) => s + p.weight, 0);

    // Find current phase index (last phase whose top <= scrollTop), clamp to last index
    let idx = 0;
    for (let i = 0; i < phasesFromStart.length; i++) {
      if (scrollTop >= phasesFromStart[i].top) idx = i;
      else break;
    }

    // compute progress within current phase segment
    const cur = phasesFromStart[idx];
    const next = phasesFromStart[idx + 1];
    const segStart = cur.top;
    const segEnd = next ? next.top : documentEnd;
    const segLen = Math.max(segEnd - segStart, 0);
    const progressInSegment = segLen > 0 ? clamp((scrollTop - segStart) / segLen, 0, 1) : (scrollTop >= segEnd ? 1 : 0);

    const weightBefore = phasesFromStart.slice(0, idx).reduce((s, p) => s + p.weight, 0);
    const accumulated = weightBefore + (cur.weight || 0) * progressInSegment;

    // compute percent: if totalWeeks > 0 use weighted percent else fallback to pos fraction
    let computedPercent;
    if (totalWeeks > 0) {
      computedPercent = clamp((accumulated / totalWeeks) * 100, 0, 100);
    } else {
      // fallback: fraction of content scrolled since phase1
      computedPercent = clamp((scrollTop - phase1Start) / (documentEnd - phase1Start) * 100, 0, 100);
    }

    // small smoothing to avoid jumps
    const last = typeof window._lastProgressPercent === 'number' ? window._lastProgressPercent : 0;
    const SMOOTH = 0.2; // 20% easing
    const smoothed = Math.round((last + (computedPercent - last) * SMOOTH) * 10) / 10;
    window._lastProgressPercent = smoothed;

    // update UI
    progressBar.style.width = `${smoothed}%`;
    progressPercent.textContent = `${smoothed}%`;
    if (smoothed === 0) progressPercent.classList.add('hidden'); else progressPercent.classList.remove('hidden');

    // optional tooltip with current phase name
    if (cur && cur.name) progressPercent.title = `Currently viewing: ${cur.name}`;
  } catch (err) {
    console.error('Error updating progress bar (weighted):', err);
  }
}
// ---------- end replaced block ----------

// Smooth scroll to section without changing URL
function smoothScrollToSection(targetId) {
  // Find H2 or H3 element specifically, not SVG elements
  const target = document.querySelector(`h2#${targetId}, h3#${targetId}`) || document.getElementById(targetId);

  if (target) {
    // Use native scrollIntoView - scroll-margin-top CSS will handle the offset
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Update all sidebar links to use smooth scroll without URL change
document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar-content a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);

      // Close sidebar first, then scroll after animation completes
      closeSidebar();

      // Wait for sidebar close animation (300ms) before scrolling
      setTimeout(() => {
        smoothScrollToSection(targetId);
      }, 350);
    });
  });
});

// Interactive Score Assessment
document.addEventListener('DOMContentLoaded', function () {
  // Load saved scores from localStorage
  loadScores();

  // Add event listeners to all score inputs
  const scoreInputs = document.querySelectorAll('.score-input');
  scoreInputs.forEach(input => {
    input.addEventListener('input', function () {
      // Ensure value is between 0 and 3
      if (this.value < 0) this.value = 0;
      if (this.value > 3) this.value = 3;

      calculateAndDisplayScore();
      saveScores();
    });

    input.addEventListener('change', function () {
      // Ensure value is between 0 and 3
      if (this.value < 0) this.value = 0;
      if (this.value === '') this.value = 0;
    });
  });

  // Load saved checklist states
  loadChecklistStates();

  // Add event listeners to all checklist items
  const checklistItems = document.querySelectorAll('.checklist-item');
  checklistItems.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const listItem = this.closest('li');
      if (this.checked) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }

      updateChecklistProgress(this.dataset.checklist);
      saveChecklistStates();
    });
  });

  // Initialize checklist progress
  const checklists = [...new Set(Array.from(checklistItems).map(item => item.dataset.checklist))];
  checklists.forEach(checklistId => {
    updateChecklistProgress(checklistId);
  });
});

function calculateAndDisplayScore() {
  const scoreInputs = document.querySelectorAll('.score-input');
  let totalScore = 0;
  const scores = {};

  scoreInputs.forEach(input => {
    const score = parseInt(input.value) || 0;
    totalScore += score;
    scores[input.dataset.skill] = score;
  });

  // Update total score display
  const totalScoreElement = document.getElementById('total-score');
  if (totalScoreElement) {
    totalScoreElement.textContent = totalScore;
  }

  // Update score interpretation
  const interpretationElement = document.getElementById('score-interpretation');
  let interpretation = '';

  if (totalScore >= 0 && totalScore <= 8) {
    interpretation = `
            <h4 style="color: #ef4444; margin-top: 0;">Score: ${totalScore}/24 - Start with fundamentals first!</h4>
            <p><strong><em>Recommendation:</em></strong> Spend 1-2 months on basic programming, Linux, and networking before starting this roadmap.</p>
            <p><strong>Suggested Resources:</strong></p>
            <ul>
                <li><a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a> - Free coding bootcamp</li>
                <li><a href="https://www.codecademy.com/" target="_blank">Codecademy</a> - Interactive coding tutorials</li>
                <li><a href="https://linuxjourney.com/" target="_blank">Linux Journey</a> - Learn Linux basics</li>
            </ul>
            <p style="color: #94a3b8;"><strong>Timeline:</strong> 2-3 months of foundational learning, then begin this roadmap</p>
        `;
  } else if (totalScore >= 9 && totalScore <= 16) {
    interpretation = `
            <h4 style="color: #fbbf24; margin-top: 0;">Score: ${totalScore}/24 - Good foundation!</h4>
            <p><strong><em>Recommendation:</em></strong> Follow the roadmap as written, but allocate extra time for weaker areas.</p>
            <p><strong>Focus Areas:</strong> Review the skills where you scored 0-1 and strengthen them as you progress through the roadmap.</p>
            <p style="color: #94a3b8;"><strong>Estimated Timeline:</strong> 34-40 weeks (8-9 months)</p>
            <p style="color: #10b981;">✓ You're ready to start the DevOps journey!</p>
        `;
  } else if (totalScore >= 17 && totalScore <= 24) {
    interpretation = `
            <h4 style="color: #10b981; margin-top: 0;">Score: ${totalScore}/24 - Strong foundation!</h4>
            <p><strong><em>Recommendation:</em></strong> You can move through phases faster. Consider accelerating your learning pace.</p>
            <p><strong>Advanced Options:</strong></p>
            <ul>
                <li>Skip or skim Phase 1-2 if you're already comfortable with Git and DevOps concepts</li>
                <li>Focus more time on advanced topics (Phase 9-12)</li>
                <li>Consider contributing to open-source projects while learning</li>
            </ul>
            <p style="color: #94a3b8;"><strong>Estimated Timeline:</strong> 6-8 months</p>
            <p style="color: #10b981;">✓✓ You're well-prepared for this DevOps roadmap!</p>
        `;
  }

  if (interpretationElement) {
    interpretationElement.innerHTML = interpretation;
    interpretationElement.classList.add('updated');
    setTimeout(() => {
      interpretationElement.classList.remove('updated');
    }, 600);
  }

  // Show weak areas and recommended phases
  displayWeakAreasFocus(scores);
}

function displayWeakAreasFocus(scores) {
  // Calculate total score to determine if user needs fundamentals first
  let totalScore = 0;
  Object.keys(scores).forEach(skill => {
    totalScore += parseInt(scores[skill]) || 0;
  });

  const weakAreasDiv = document.getElementById('weak-areas-focus');
  const phasesList = document.getElementById('focus-phases-list');

  // If score is 0-8, show prerequisite resources instead
  if (totalScore >= 0 && totalScore <= 8) {
    const skillNames = {
      'commandline': 'Command Line',
      'programming': 'Programming',
      'networking': 'Networking',
      'webdev': 'Web Development',
      'linux': 'Linux/Unix',
      'git': 'Version Control',
      'cloud': 'Cloud Platforms',
      'problemsolving': 'Problem Solving'
    };

    // Find weak areas (scores 0-1)
    const weakAreas = [];
    Object.keys(scores).forEach(skill => {
      if (scores[skill] <= 1) {
        weakAreas.push(skill);
      }
    });

    if (weakAreas.length === 0) {
      weakAreasDiv.style.display = 'none';
      return;
    }

    // Show prerequisite learning resources
    let html = '<div style="background: #0f172a; padding: 15px; border-radius: 6px; margin-top: 15px;">';
    html += '<p style="color: #fbbf24; margin-bottom: 15px;"><strong>Build these foundational skills first:</strong> ' +
      weakAreas.map(s => skillNames[s]).join(', ') + '</p>';

    // Prerequisite resources mapped to skills
    const prerequisiteResources = {
      'commandline': {
        name: 'Command Line Basics',
        resources: [
          { name: 'Command Line Crash Course', url: 'https://www.freecodecamp.org/news/command-line-for-beginners/', type: 'Tutorial' },
          { name: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'Interactive' }
        ]
      },
      'programming': {
        name: 'Programming Fundamentals',
        resources: [
          { name: 'Python for Beginners', url: 'https://www.freecodecamp.org/news/learning-python-from-zero-to-hero-120ea540b567/', type: 'Course' },
          { name: 'JavaScript Basics', url: 'https://www.codecademy.com/learn/introduction-to-javascript', type: 'Interactive' },
          { name: 'CS50 Introduction to Programming', url: 'https://cs50.harvard.edu/x/', type: 'Course' }
        ]
      },
      'networking': {
        name: 'Networking Basics',
        resources: [
          { name: 'Networking Fundamentals', url: 'https://www.youtube.com/watch?v=3QhU9jd03a0', type: 'Video' },
          { name: 'Computer Networks Course', url: 'https://www.coursera.org/learn/computer-networking', type: 'Course' }
        ]
      },
      'webdev': {
        name: 'Web Development Basics',
        resources: [
          { name: 'HTML/CSS/JavaScript', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', type: 'Course' },
          { name: 'Build Your First Web App', url: 'https://www.theodinproject.com/', type: 'Project-based' }
        ]
      },
      'linux': {
        name: 'Linux Fundamentals',
        resources: [
          { name: 'Linux for Beginners', url: 'https://linuxjourney.com/', type: 'Interactive' },
          { name: 'Introduction to Linux', url: 'https://www.edx.org/learn/linux', type: 'Course' }
        ]
      },
      'git': {
        name: 'Git & Version Control',
        resources: [
          { name: 'Git Tutorial', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'Video' },
          { name: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'Interactive' }
        ]
      },
      'cloud': {
        name: 'Cloud Computing Basics',
        resources: [
          { name: 'Cloud Computing Concepts', url: 'https://www.coursera.org/learn/cloud-computing', type: 'Course' },
          { name: 'AWS Cloud Practitioner', url: 'https://skillbuilder.aws/', type: 'Course' }
        ]
      },
      'problemsolving': {
        name: 'Problem Solving & Debugging',
        resources: [
          { name: 'How to Think Like a Programmer', url: 'https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/', type: 'Article' },
          { name: 'Debug Like a Pro', url: 'https://www.coursera.org/learn/duke-programming-web', type: 'Course' }
        ]
      }
    };

    weakAreas.forEach(skill => {
      const resource = prerequisiteResources[skill];
      if (resource) {
        html += `
                    <div style="background: #1e293b; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #ef4444;">
                        <h5 style="color: #f87171; margin: 0 0 10px 0;">
                            <i class="fas fa-book-open" style="color: #fbbf24;"></i> ${resource.name}
                        </h5>
                `;

        resource.resources.forEach(item => {
          html += `
                        <p style="color: #cbd5e1; margin: 5px 0; font-size: 0.95em;">
                            <strong style="color: #94a3b8;">[${item.type}]</strong>
                            <a href="${item.url}" target="_blank" style="color: #60a5fa;">${item.name}</a>
                        </p>
                    `;
        });

        html += '</div>';
      }
    });

    html += '</div>';
    html += '<p style="color: #94a3b8; margin-top: 15px; font-size: 0.95em;"><strong>⏱️ Timeline:</strong> Spend 1-2 months on these fundamentals before starting the full DevOps roadmap. Building a strong foundation will make everything else much easier!</p>';

    phasesList.innerHTML = html;

    // Update heading to reflect prerequisite focus
    const headingElement = weakAreasDiv.querySelector('h4');
    if (headingElement) {
      headingElement.innerHTML = '<i class="fas fa-graduation-cap" style="color: #fbbf24;"></i> Prerequisite Learning Resources';
    }
    const descElement = weakAreasDiv.querySelector('p');
    if (descElement) {
      descElement.textContent = 'Start with these resources to build your foundational skills before beginning the DevOps roadmap:';
    }

    weakAreasDiv.style.display = 'block';
    weakAreasDiv.style.borderLeftColor = '#ef4444';
    weakAreasDiv.classList.add('updated');
    setTimeout(() => {
      weakAreasDiv.classList.remove('updated');
    }, 600);
    return;
  }

  // For scores 9+, show phase recommendations
  // Map skills to relevant phases
  const skillToPhases = {
    'commandline': [
      { phase: 'Phase 3', name: 'Linux Administration & Networking', reason: 'Master command line tools and shell scripting' }
    ],
    'programming': [
      { phase: 'Phase 1', name: 'DevOps Fundamentals', reason: 'Learn scripting and automation basics' },
      { phase: 'Phase 6', name: 'Configuration Management (Ansible)', reason: 'Write automation playbooks' },
      { phase: 'Phase 9', name: 'CI/CD Automation', reason: 'Create pipeline scripts' }
    ],
    'networking': [
      { phase: 'Phase 3', name: 'Linux Administration & Networking', reason: 'Deep dive into networking concepts, DNS, and protocols' },
      { phase: 'Phase 4', name: 'Cloud Infrastructure (AWS)', reason: 'Configure VPCs, subnets, and security groups' }
    ],
    'webdev': [
      { phase: 'Phase 2', name: 'Version Control & Collaboration', reason: 'Build and version control applications' },
      { phase: 'Quick Start Track', name: 'Quick Start (Weeks 1-3)', reason: 'Build a simple web application from scratch' }
    ],
    'linux': [
      { phase: 'Phase 3', name: 'Linux Administration & Networking', reason: 'Comprehensive Linux system administration training' },
      { phase: 'Phase 4', name: 'Cloud Infrastructure (AWS)', reason: 'Manage Linux servers in the cloud' }
    ],
    'git': [
      { phase: 'Phase 2', name: 'Version Control & Collaboration', reason: 'Master Git workflows, branching, and collaboration' },
      { phase: 'Phase 9', name: 'CI/CD Automation', reason: 'Integrate Git with automated pipelines' }
    ],
    'cloud': [
      { phase: 'Phase 4', name: 'Cloud Infrastructure (AWS)', reason: 'Learn AWS services, EC2, S3, RDS, and more' },
      { phase: 'Phase 5', name: 'Infrastructure as Code (Terraform)', reason: 'Provision cloud infrastructure programmatically' },
      { phase: 'Phase 12', name: 'Serverless & Advanced Patterns', reason: 'Master advanced cloud architectures' }
    ],
    'problemsolving': [
      { phase: 'Phase 10', name: 'Monitoring & Observability', reason: 'Learn to debug and troubleshoot production issues' },
      { phase: 'Phase 11', name: 'Security & Compliance', reason: 'Identify and resolve security vulnerabilities' },
      { phase: 'All Phases', name: 'Throughout the Roadmap', reason: 'Practice debugging at every step' }
    ]
  };

  // Find weak areas (scores 0-1)
  const weakAreas = [];
  Object.keys(scores).forEach(skill => {
    if (scores[skill] <= 1) {
      weakAreas.push(skill);
    }
  });

  if (weakAreas.length === 0) {
    weakAreasDiv.style.display = 'none';
    return;
  }

  // Reset heading and description for phase recommendations
  const headingElement = weakAreasDiv.querySelector('h4');
  if (headingElement) {
    headingElement.innerHTML = '🎯 Recommended Focus Areas';
  }
  const descElement = weakAreasDiv.querySelector('p');
  if (descElement) {
    descElement.textContent = 'Based on your weaker areas (scores 0-1), here are the phases you should pay extra attention to:';
  }
  weakAreasDiv.style.borderLeftColor = '#f59e0b';

  // Build recommendations
  const phaseMap = new Map();
  const skillNames = {
    'commandline': 'Command Line',
    'programming': 'Programming',
    'networking': 'Networking',
    'webdev': 'Web Development',
    'linux': 'Linux/Unix',
    'git': 'Version Control',
    'cloud': 'Cloud Platforms',
    'problemsolving': 'Problem Solving'
  };

  weakAreas.forEach(skill => {
    const phases = skillToPhases[skill] || [];
    phases.forEach(phaseInfo => {
      if (!phaseMap.has(phaseInfo.phase)) {
        phaseMap.set(phaseInfo.phase, {
          name: phaseInfo.name,
          skills: [],
          reasons: []
        });
      }
      const phaseData = phaseMap.get(phaseInfo.phase);
      phaseData.skills.push(skillNames[skill]);
      phaseData.reasons.push(phaseInfo.reason);
    });
  });

  // Generate HTML
  let html = '<div style="background: #0f172a; padding: 15px; border-radius: 6px; margin-top: 15px;">';
  html += '<p style="color: #fbbf24; margin-bottom: 15px;"><strong>Your weak areas:</strong> ' +
    weakAreas.map(s => skillNames[s]).join(', ') + '</p>';

  phaseMap.forEach((data, phase) => {
    html += `
            <div style="background: #1e293b; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 3px solid #3730a3;">
                <h5 style="color: #60a5fa; margin: 0 0 8px 0;">
                    <i class="fas fa-arrow-right" style="color: #10b981;"></i> ${phase}: ${data.name}
                </h5>
                <p style="color: #cbd5e1; margin: 5px 0; font-size: 0.95em;">
                    <strong>Improves:</strong> ${[...new Set(data.skills)].join(', ')}
                </p>
                <p style="color: #94a3b8; margin: 5px 0; font-size: 0.9em;">
                    <em>${data.reasons[0]}</em>
                </p>
            </div>
        `;
  });

  html += '</div>';
  html += '<p style="color: #94a3b8; margin-top: 15px; font-size: 0.95em;"><strong>💡 Tip:</strong> Don\'t worry if you have weak areas! This roadmap is designed to teach you everything from scratch. Pay extra attention and allocate more time to these phases.</p>';

  phasesList.innerHTML = html;
  weakAreasDiv.style.display = 'block';
  weakAreasDiv.classList.add('updated');
  setTimeout(() => {
    weakAreasDiv.classList.remove('updated');
  }, 600);
}

function updateChecklistProgress(checklistId) {
  const checklist = document.getElementById(checklistId + '-checklist');
  if (!checklist) {
    console.warn(`Checklist not found: ${checklistId}-checklist`);
    return;
  }

  const items = checklist.querySelectorAll('.checklist-item');
  const completed = checklist.querySelectorAll('.checklist-item:checked').length;
  const total = items.length;

  if (total === 0) {
    console.warn(`No checklist items found for: ${checklistId}`);
    return;
  }

  const percentage = Math.round((completed / total) * 100);

  const progressDiv = document.getElementById(checklistId + '-progress');
  if (!progressDiv) {
    console.warn(`Progress div not found: ${checklistId}-progress`);
    return;
  }

  const progressText = progressDiv.querySelector('.progress-text');
  const progressBar = progressDiv.querySelector('.progress-bar');

  if (progressText) {
    progressText.textContent = `${completed} / ${total} completed`;
  }

  if (progressBar) {
    progressBar.style.width = percentage + '%';
    if (percentage === 100) {
      progressBar.style.background = 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
      progressBar.innerHTML = '🎉 Complete!';
    } else {
      progressBar.style.background = 'linear-gradient(90deg, #3730a3 0%, #10b981 100%)';
      progressBar.innerHTML = '';
    }
  }

  console.log(`Updated progress for ${checklistId}: ${completed}/${total} (${percentage}%)`);
}

function saveScores() {
  const scoreInputs = document.querySelectorAll('.score-input');
  const scores = {};

  scoreInputs.forEach(input => {
    scores[input.dataset.skill] = input.value;
  });

  localStorage.setItem('devops-roadmap-scores', JSON.stringify(scores));
}

function loadScores() {
  const saved = localStorage.getItem('devops-roadmap-scores');
  if (saved) {
    const scores = JSON.parse(saved);

    Object.keys(scores).forEach(skill => {
      const input = document.querySelector(`[data-skill="${skill}"]`);
      if (input) {
        input.value = scores[skill];
      }
    });

    calculateAndDisplayScore();
  }
}

function saveChecklistStates() {
  const checklistItems = document.querySelectorAll('.checklist-item');
  const states = {};

  checklistItems.forEach(item => {
    const checklistId = item.dataset.checklist;
    const itemId = item.dataset.item;

    if (!states[checklistId]) {
      states[checklistId] = {};
    }

    states[checklistId][itemId] = item.checked;
  });

  localStorage.setItem('devops-roadmap-checklists', JSON.stringify(states));
}

function loadChecklistStates() {
  const saved = localStorage.getItem('devops-roadmap-checklists');
  if (saved) {
    const states = JSON.parse(saved);
    const checklistsToUpdate = new Set();

    Object.keys(states).forEach(checklistId => {
      Object.keys(states[checklistId]).forEach(itemId => {
        const checkbox = document.querySelector(`[data-checklist="${checklistId}"][data-item="${itemId}"]`);
        if (checkbox) {
          checkbox.checked = states[checklistId][itemId];
          const listItem = checkbox.closest('li');
          if (checkbox.checked) {
            listItem.classList.add('completed');
          }
          checklistsToUpdate.add(checklistId);
        }
      });
    });

    // Update progress for all checklists that had saved states
    checklistsToUpdate.forEach(checklistId => {
      updateChecklistProgress(checklistId);
    });
  }
}
