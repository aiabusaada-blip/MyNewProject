// Nujeel Phase 2: Technology Capability Graph — In-Memory Data Layer
// Serves the complete technology taxonomy without requiring a database connection.
// When Supabase credentials are available, API routes can switch to DB queries.

export interface Domain {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  sort_order: number;
}

export interface Category {
  id: string;
  domain_id: string;
  name: string;
  name_ar: string;
  description: string;
  sort_order: number;
}

export interface Vendor {
  id: string;
  name: string;
  name_ar?: string;
  description: string;
  headquarters_country_id?: string;
  website?: string;
  logo_url?: string;
  sort_order: number;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  name_ar?: string;
  description: string;
  category_id?: string;
  sort_order: number;
}

export interface Capability {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  sort_order: number;
}

export interface ProductCapability {
  id: string;
  product_id: string;
  capability_id: string;
  proficiency_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Alias {
  id: string;
  canonical_name: string;
  alias: string;
  alias_type: "abbreviation" | "historical" | "common_misspelling" | "alternative";
}

// ── Seed data populated from database/migrations/002_capability_graph_seed.sql ──

export const seedDomains: Domain[] = [
  { id: "d1", name: "Cybersecurity", name_ar: "الأمن السيبراني", description: "Information security, threat detection, identity & access management, encryption, and security operations.", sort_order: 1 },
  { id: "d2", name: "Infrastructure", name_ar: "البنية التحتية", description: "Server hardware, storage systems, networking equipment, and physical data center infrastructure.", sort_order: 2 },
  { id: "d3", name: "Cloud", name_ar: "السحابة", description: "Cloud platforms, hybrid cloud, multi-cloud strategies, cloud migration, and cloud-native services.", sort_order: 3 },
  { id: "d4", name: "Networking", name_ar: "الشبكات", description: "LAN/WAN, SD-WAN, SASE, network design, routing, switching, and network services.", sort_order: 4 },
  { id: "d5", name: "Backup & Data Protection", name_ar: "النسخ الاحتياطي وحماية البيانات", description: "Backup solutions, data replication, disaster recovery, archival, and data resilience.", sort_order: 5 },
  { id: "d6", name: "DevOps", name_ar: "ديفأبس", description: "CI/CD pipelines, infrastructure as code, automation, containerization, and developer tooling.", sort_order: 6 },
  { id: "d7", name: "Kubernetes", name_ar: "كوبرناتس", description: "Container orchestration, cluster management, Helm charts, service mesh, and cloud-native platforms.", sort_order: 7 },
  { id: "d8", name: "AI", name_ar: "الذكاء الاصطناعي", description: "Artificial intelligence, machine learning, generative AI, MLOps, and AI-powered services.", sort_order: 8 },
  { id: "d9", name: "Data & Analytics", name_ar: "البيانات والتحليلات", description: "Data warehouses, data lakes, BI platforms, analytics pipelines, and data engineering.", sort_order: 9 },
  { id: "d10", name: "Observability", name_ar: "المراقبة والرصد", description: "Monitoring, logging, tracing, metrics, alerting, and full-stack observability platforms.", sort_order: 10 },
  { id: "d11", name: "IAM", name_ar: "إدارة الهوية والوصول", description: "Identity and access management, SSO, MFA, privileged access, and zero trust architecture.", sort_order: 11 },
  { id: "d12", name: "Digital Transformation", name_ar: "التحول الرقمي", description: "Business process modernization, DX strategy, change management, and enterprise modernization.", sort_order: 12 },
  { id: "d13", name: "Consulting Services", name_ar: "خدمات الاستشارات", description: "Technology advisory, strategy consulting, implementation services, and managed services.", sort_order: 13 },
];

export const seedCategories: Category[] = [
  { id: "c1", domain_id: "d1", name: "Vulnerability Management", name_ar: "إدارة الثغرات", description: "Vulnerability scanning, assessment, and remediation management.", sort_order: 1 },
  { id: "c2", domain_id: "d1", name: "Endpoint Security", name_ar: "أمن نقاط النهاية", description: "EDR, XDR, endpoint protection, and device security.", sort_order: 2 },
  { id: "c3", domain_id: "d1", name: "Network Security", name_ar: "أمن الشبكات", description: "Firewalls, NGFW, network segmentation, and intrusion prevention.", sort_order: 3 },
  { id: "c4", domain_id: "d1", name: "Cloud Security", name_ar: "أمن السحابة", description: "Cloud security posture management, CSPM, and cloud workload protection.", sort_order: 4 },
  { id: "c5", domain_id: "d1", name: "Identity & Access Security", name_ar: "أمن الهوية والوصول", description: "IAM security, privileged access management, and identity threat detection.", sort_order: 5 },
  { id: "c6", domain_id: "d1", name: "Email Security", name_ar: "أمن البريد الإلكتروني", description: "Email gateway, anti-phishing, and email threat protection.", sort_order: 6 },
  { id: "c7", domain_id: "d1", name: "Zero Trust", name_ar: "الثقة الصفرية", description: "Zero trust architecture, micro-segmentation, and continuous verification.", sort_order: 7 },
  { id: "c8", domain_id: "d1", name: "Security Operations", name_ar: "عمليات الأمن", description: "SIEM, SOAR, threat intelligence, and security operations center services.", sort_order: 8 },
  { id: "c9", domain_id: "d2", name: "Server Infrastructure", name_ar: "بنية الخوادم", description: "Physical servers, rack servers, blade servers, and server management.", sort_order: 1 },
  { id: "c10", domain_id: "d2", name: "Storage Infrastructure", name_ar: "بنية التخزين", description: "SAN, NAS, hyper-converged storage, and storage networking.", sort_order: 2 },
  { id: "c11", domain_id: "d2", name: "Data Center", name_ar: "مراكز البيانات", description: "Data center design, facilities, power, cooling, and colocation.", sort_order: 3 },
  { id: "c12", domain_id: "d3", name: "Public Cloud Platforms", name_ar: "منصات السحابة العامة", description: "AWS, Azure, GCP, and other public cloud provider services.", sort_order: 1 },
  { id: "c13", domain_id: "d3", name: "Hybrid & Multi-Cloud", name_ar: "السحابة الهجينة والمتعددة", description: "Hybrid cloud architecture, multi-cloud management, and cloud federation.", sort_order: 2 },
  { id: "c14", domain_id: "d3", name: "Cloud Migration", name_ar: "انتقال السحابة", description: "Lift-and-shift, re-platforming, and cloud-native migration strategies.", sort_order: 3 },
  { id: "c15", domain_id: "d3", name: "Cloud-Native Services", name_ar: "خدمات السحابة الأصلية", description: "Serverless, managed services, container platforms, and cloud-native architecture.", sort_order: 4 },
  { id: "c16", domain_id: "d4", name: "Enterprise Networking", name_ar: "الشبكات المؤسسية", description: "Campus LAN, SD-WAN, switching, and routing.", sort_order: 1 },
  { id: "c17", domain_id: "d4", name: "Network Security Services", name_ar: "خدمات أمن الشبكات", description: "FWaaS, ZTNA, SASE, and secure access service edge.", sort_order: 2 },
  { id: "c18", domain_id: "d4", name: "Unified Communications", name_ar: "الاتصالات الموحدة", description: "Voice, video, collaboration, and UC platforms.", sort_order: 3 },
  { id: "c19", domain_id: "d5", name: "Backup Solutions", name_ar: "حلول النسخ الاحتياطي", description: "Backup software, backup appliances, and backup-as-a-service.", sort_order: 1 },
  { id: "c20", domain_id: "d5", name: "Disaster Recovery", name_ar: "الاستعادة من الكوارث", description: "DR planning, DR-as-a-service, and business continuity.", sort_order: 2 },
  { id: "c21", domain_id: "d5", name: "Data Resilience", name_ar: "مرونة البيانات", description: "Ransomware protection, immutable backups, and data integrity.", sort_order: 3 },
  { id: "c22", domain_id: "d6", name: "CI/CD & Automation", name_ar: "النسخ المستمر والأتمتة", description: "Jenkins, GitLab CI, GitHub Actions, and automation pipelines.", sort_order: 1 },
  { id: "c23", domain_id: "d6", name: "Infrastructure as Code", name_ar: "بنية Terraform ككود", description: "Terraform, Ansible, CloudFormation, and declarative infrastructure.", sort_order: 2 },
  { id: "c24", domain_id: "d6", name: "Containerization", name_ar: "التجميع", description: "Docker, Podman, container runtimes, and container security.", sort_order: 3 },
  { id: "c25", domain_id: "d7", name: "Cluster Management", name_ar: "إدارة المجمعات", description: "EKS, AKS, GKE, Rancher, OpenShift, and cluster operations.", sort_order: 1 },
  { id: "c26", domain_id: "d7", name: "Service Mesh", name_ar: "شبكة الخدمات", description: "Istio, Linkerd, Consul Connect, and service mesh architectures.", sort_order: 2 },
  { id: "c27", domain_id: "d7", name: "Container Platforms", name_ar: "منصات الحاويات", description: "Platform engineering, internal developer platforms, and Kubernetes distributions.", sort_order: 3 },
  { id: "c28", domain_id: "d8", name: "Generative AI", name_ar: "الذكاء الاصطناعي التوليدي", description: "LLMs, prompt engineering, RAG, and generative AI applications.", sort_order: 1 },
  { id: "c29", domain_id: "d8", name: "Machine Learning Operations", name_ar: "عمليات تعلم الآلة", description: "MLPs, model deployment, model monitoring, and ML pipelines.", sort_order: 2 },
  { id: "c30", domain_id: "d8", name: "AI Platforms & Tools", name_ar: "منصات وأدوات الذكاء الاصطناعي", description: "AI development platforms, vector databases, and AI tooling.", sort_order: 3 },
  { id: "c31", domain_id: "d9", name: "Data Warehousing", name_ar: "خزن البيانات", description: "Snowflake, Redshift, BigQuery, and cloud data warehouses.", sort_order: 1 },
  { id: "c32", domain_id: "d9", name: "BI & Visualization", name_ar: "الأعمال والبصريات", description: "Power BI, Tableau, Looker, and business intelligence dashboards.", sort_order: 2 },
  { id: "c33", domain_id: "d9", name: "Data Engineering", name_ar: "هندسة البيانات", description: "ETL/ELT pipelines, data lakes, data mesh, and stream processing.", sort_order: 3 },
  { id: "c34", domain_id: "d10", name: "Application Monitoring", name_ar: "مراقبة التطبيقات", description: "APM, distributed tracing, and application performance monitoring.", sort_order: 1 },
  { id: "c35", domain_id: "d10", name: "Infrastructure Monitoring", name_ar: "مراقبة البنية التحتية", description: "Infrastructure metrics, cloud monitoring, and infrastructure observability.", sort_order: 2 },
  { id: "c36", domain_id: "d10", name: "Logging & Tracing", name_ar: "السجلات والتتبع", description: "Centralized logging, log analytics, and distributed tracing platforms.", sort_order: 3 },
  { id: "c37", domain_id: "d11", name: "Identity Management", name_ar: "إدارة الهوية", description: "Directory services, identity governance, and lifecycle management.", sort_order: 1 },
  { id: "c38", domain_id: "d11", name: "Access Management", name_ar: "إدارة الوصول", description: "SSO, MFA, adaptive authentication, and access governance.", sort_order: 2 },
  { id: "c39", domain_id: "d11", name: "Privileged Access", name_ar: "الوصول ذو الامتياز", description: "PAM, secrets management, and privileged session management.", sort_order: 3 },
  { id: "c40", domain_id: "d12", name: "Strategy & Roadmap", name_ar: "الاستراتيجية والخارطة الطريق", description: "DX strategy, business case development, and transformation roadmap.", sort_order: 1 },
  { id: "c41", domain_id: "d12", name: "Process Modernization", name_ar: "تحديث العمليات", description: "Business process reengineering, workflow automation, and digital processes.", sort_order: 2 },
  { id: "c42", domain_id: "d12", name: "Change Management", name_ar: "إدارة التغيير", description: "Organizational change, user adoption, and transformation enablement.", sort_order: 3 },
  { id: "c43", domain_id: "d13", name: "Technology Advisory", name_ar: "الاستشارات التقنية", description: "Technology strategy, architecture advisory, and technology selection.", sort_order: 1 },
  { id: "c44", domain_id: "d13", name: "Implementation Services", name_ar: "خدمات التنفيذ", description: "System implementation, integration, and deployment services.", sort_order: 2 },
  { id: "c45", domain_id: "d13", name: "Managed Services", name_ar: "الخدمات المدارة", description: "Managed infrastructure, managed security, and ongoing operations support.", sort_order: 3 },
];

export const seedVendors: Vendor[] = [
  { id: "v1", name: "Tenable", description: "Cybersecurity risk detection and exposure management.", sort_order: 1 },
  { id: "v2", name: "Palo Alto Networks", description: "Next-generation firewalls, cloud security, and XDR platforms.", sort_order: 2 },
  { id: "v3", name: "Fortinet", description: "Integrated network security fabric, firewalls, and SD-WAN.", sort_order: 3 },
  { id: "v4", name: "CrowdStrike", description: "Cloud-native endpoint protection, threat intelligence, and XDR.", sort_order: 4 },
  { id: "v5", name: "CyberArk", description: "Privileged access management and identity security.", sort_order: 5 },
  { id: "v6", name: "Microsoft", description: "Cloud platforms, productivity, security, and enterprise software.", sort_order: 6 },
  { id: "v7", name: "Cisco", description: "Networking, collaboration, and enterprise security solutions.", sort_order: 7 },
  { id: "v8", name: "Check Point", description: "Next-generation firewalls and threat prevention.", sort_order: 8 },
  { id: "v9", name: "F5", description: "Application delivery, WAF, and API security.", sort_order: 9 },
  { id: "v10", name: "Imperva", description: "Data security, web application firewall, and DDoS protection.", sort_order: 10 },
  { id: "v11", name: "Zscaler", description: "Cloud security, SASE, and zero trust network access.", sort_order: 11 },
  { id: "v12", name: "Netskope", description: "Cloud access security broker, SASE, and data protection.", sort_order: 12 },
  { id: "v13", name: "Proofpoint", description: "Email security, data loss prevention, and compliance.", sort_order: 13 },
  { id: "v14", name: "Qualys", description: "Cloud-based vulnerability management and compliance.", sort_order: 14 },
  { id: "v15", name: "Rapid7", description: "Vulnerability management, detection, and response.", sort_order: 15 },
  { id: "v16", name: "Splunk", description: "SIEM, observability, and security analytics.", sort_order: 16 },
  { id: "v17", name: "Nutanix", description: "Hyper-converged infrastructure and cloud platforms.", sort_order: 17 },
  { id: "v18", name: "VMware", description: "Virtualization, cloud infrastructure, and modern applications.", sort_order: 18 },
  { id: "v19", name: "Dell Technologies", description: "Server, storage, and data center infrastructure.", sort_order: 19 },
  { id: "v20", name: "HPE", description: "Servers, storage, and hybrid cloud infrastructure.", sort_order: 20 },
  { id: "v21", name: "Red Hat", description: "Open-source enterprise platforms, Linux, and Kubernetes.", sort_order: 21 },
  { id: "v22", name: "Cohesity", description: "Data management, backup, and ransomware protection.", sort_order: 22 },
  { id: "v23", name: "Veeam", description: "Backup, recovery, and data resilience for virtual/cloud environments.", sort_order: 23 },
  { id: "v24", name: "Rubrik", description: "Ransomware recovery, backup, and data security.", sort_order: 24 },
  { id: "v25", name: "Commvault", description: "Data protection, backup, and information management.", sort_order: 25 },
];

export const seedProducts: Product[] = [
  // Tenable
  { id: "p1", vendor_id: "v1", category_id: "c1", name: "Tenable One", description: "Exposure management platform for cyber risk visibility.", sort_order: 1 },
  { id: "p2", vendor_id: "v1", category_id: "c1", name: "Tenable Nessus", description: "Vulnerability scanning and assessment.", sort_order: 2 },
  { id: "p3", vendor_id: "v1", category_id: "c1", name: "Tenable.io", description: "Web application and cloud vulnerability management.", sort_order: 3 },
  { id: "p4", vendor_id: "v1", category_id: "c1", name: "Tenable.sc", description: "Security center for continuous security monitoring.", sort_order: 4 },
  // Palo Alto Networks
  { id: "p5", vendor_id: "v2", category_id: "c4", name: "Next-Generation Firewall", description: "NGFW with threat prevention and URL filtering.", sort_order: 1 },
  { id: "p6", vendor_id: "v2", category_id: "c4", name: "Cortex XDR", description: "Extended detection and response platform.", sort_order: 2 },
  { id: "p7", vendor_id: "v2", category_id: "c4", name: "Prisma Cloud", description: "Cloud security platform (CNAPP/CSPM).", sort_order: 3 },
  { id: "p8", vendor_id: "v2", category_id: "c4", name: "Prisma SASE", description: "Secure access service edge platform.", sort_order: 4 },
  { id: "p9", vendor_id: "v2", category_id: "c4", name: "Strata", description: "Network security operating system.", sort_order: 5 },
  { id: "p10", vendor_id: "v2", category_id: "c4", name: "Cortex XSOAR", description: "Security orchestration, automation, and response.", sort_order: 6 },
  // Fortinet
  { id: "p11", vendor_id: "v3", category_id: "c3", name: "FortiGate", description: "Next-generation firewall and SD-WAN platform.", sort_order: 1 },
  { id: "p12", vendor_id: "v3", category_id: "c3", name: "FortiAnalyzer", description: "Centralized log analysis and reporting.", sort_order: 2 },
  { id: "p13", vendor_id: "v3", category_id: "c3", name: "FortiSIEM", description: "Security information and event management.", sort_order: 3 },
  { id: "p14", vendor_id: "v3", category_id: "c3", name: "FortiClient", description: "Endpoint protection and Zero Trust network access.", sort_order: 4 },
  { id: "p15", vendor_id: "v3", category_id: "c3", name: "FortiManager", description: "Centralized device management and administration.", sort_order: 5 },
  // CrowdStrike
  { id: "p16", vendor_id: "v4", category_id: "c2", name: "Falcon Prevent", description: "Next-gen antivirus and endpoint protection.", sort_order: 1 },
  { id: "p17", vendor_id: "v4", category_id: "c2", name: "Falcon Insight", description: "EDR with threat detection and response.", sort_order: 2 },
  { id: "p18", vendor_id: "v4", category_id: "c2", name: "Falcon OverWatch", description: "Managed threat hunting service.", sort_order: 3 },
  { id: "p19", vendor_id: "v4", category_id: "c2", name: "Falcon Complete", description: "Managed endpoint protection and response.", sort_order: 4 },
  { id: "p20", vendor_id: "v4", category_id: "c2", name: "CrowdStrike Falcon", description: "Cloud-native security platform.", sort_order: 5 },
  // CyberArk
  { id: "p21", vendor_id: "v5", category_id: "c39", name: "Privileged Access Manager", description: "Privileged account and session management.", sort_order: 1 },
  { id: "p22", vendor_id: "v5", category_id: "c39", name: "CyberArk Conjur", description: "Secrets management for applications and infrastructure.", sort_order: 2 },
  { id: "p23", vendor_id: "v5", category_id: "c39", name: "CyberArk Secure Web Sessions", description: "Secure remote access for web applications.", sort_order: 3 },
  { id: "p24", vendor_id: "v5", category_id: "c39", name: "CyberArk Alero", description: "Zero trust access for remote vendors.", sort_order: 4 },
  // Microsoft
  { id: "p25", vendor_id: "v6", category_id: "c15", name: "Microsoft 365", description: "Cloud-based productivity and collaboration suite.", sort_order: 1 },
  { id: "p26", vendor_id: "v6", category_id: "c15", name: "Azure", description: "Cloud computing platform and services.", sort_order: 2 },
  { id: "p27", vendor_id: "v6", category_id: "c15", name: "Microsoft Entra ID", description: "Identity and access management (Azure AD).", sort_order: 3 },
  { id: "p28", vendor_id: "v6", category_id: "c15", name: "Microsoft Defender", description: "Endpoint and cloud threat protection.", sort_order: 4 },
  { id: "p29", vendor_id: "v6", category_id: "c15", name: "Microsoft Sentinel", description: "Cloud-native SIEM and SOAR solution.", sort_order: 5 },
  { id: "p30", vendor_id: "v6", category_id: "c15", name: "Power Platform", description: "Low-code platform for business applications.", sort_order: 6 },
  // Cisco
  { id: "p31", vendor_id: "v7", category_id: "c3", name: "Cisco Secure Firewall", description: "Next-generation firewalls and threat defense.", sort_order: 1 },
  { id: "p32", vendor_id: "v7", category_id: "c3", name: "Cisco Meraki", description: "Cloud-managed networking and security.", sort_order: 2 },
  { id: "p33", vendor_id: "v7", category_id: "c3", name: "Cisco SD-WAN", description: "Software-defined wide area networking.", sort_order: 3 },
  { id: "p34", vendor_id: "v7", category_id: "c3", name: "Cisco Webex", description: "Collaboration and unified communications.", sort_order: 4 },
  { id: "p35", vendor_id: "v7", category_id: "c3", name: "Cisco Umbrella", description: "Cloud-delivered secure internet gateway.", sort_order: 5 },
  { id: "p36", vendor_id: "v7", category_id: "c3", name: "Cisco ACI", description: "Application centric infrastructure for data centers.", sort_order: 6 },
  // Check Point
  { id: "p37", vendor_id: "v8", category_id: "c17", name: "Check Point Infinity", description: "Consolidated threat prevention architecture.", sort_order: 1 },
  { id: "p38", vendor_id: "v8", category_id: "c17", name: "Check Point Quantum", description: "Next-generation firewall platform.", sort_order: 2 },
  { id: "p39", vendor_id: "v8", category_id: "c17", name: "Check Point Harmony", description: "Unified endpoint and email security.", sort_order: 3 },
  { id: "p40", vendor_id: "v8", category_id: "c17", name: "Check Point CloudGuard", description: "Cloud security and workload protection.", sort_order: 4 },
  // F5
  { id: "p41", vendor_id: "v9", category_id: "c17", name: "F5 BIG-IP", description: "Application delivery controller and WAF.", sort_order: 1 },
  { id: "p42", vendor_id: "v9", category_id: "c17", name: "F5 Advanced WAF", description: "Web application firewall protection.", sort_order: 2 },
  { id: "p43", vendor_id: "v9", category_id: "c17", name: "F5 Distributed Cloud", description: "Multi-cloud application delivery and security.", sort_order: 3 },
  { id: "p44", vendor_id: "v9", category_id: "c17", name: "F5 BIG-IQ", description: "Centralized management and analytics.", sort_order: 4 },
  // Imperva
  { id: "p45", vendor_id: "v10", category_id: "c7", name: "Imperva SecureSphere", description: "Web application firewall and database security.", sort_order: 1 },
  { id: "p46", vendor_id: "v10", category_id: "c7", name: "Imperva Data Security", description: "Data security and analytics platform.", sort_order: 2 },
  { id: "p47", vendor_id: "v10", category_id: "c7", name: "Imperva Cloud WAF", description: "Cloud-based web application firewall.", sort_order: 3 },
  { id: "p48", vendor_id: "v10", category_id: "c7", name: "Imperva Sonar", description: "Data security posture management.", sort_order: 4 },
  // Zscaler
  { id: "p49", vendor_id: "v11", category_id: "c7", name: "Zscaler Internet Access", description: "Cloud-delivered secure internet access.", sort_order: 1 },
  { id: "p50", vendor_id: "v11", category_id: "c7", name: "Zscaler Private Access", description: "Zero trust private application access.", sort_order: 2 },
  { id: "p51", vendor_id: "v11", category_id: "c7", name: "Zscaler Digital Experience", description: "Digital experience monitoring and analytics.", sort_order: 3 },
  { id: "p52", vendor_id: "v11", category_id: "c7", name: "Zscaler Cloud Sandbox", description: "Threat detection and analysis sandbox.", sort_order: 4 },
  // Netskope
  { id: "p53", vendor_id: "v12", category_id: "c6", name: "Netskope Security Platform", description: "Cloud access security broker and security platform.", sort_order: 1 },
  { id: "p54", vendor_id: "v12", category_id: "c6", name: "Netskope SASE", description: "Secure access service edge platform.", sort_order: 2 },
  { id: "p55", vendor_id: "v12", category_id: "c6", name: "Netskope Data Loss Prevention", description: "Data protection and DLP for cloud apps.", sort_order: 3 },
  { id: "p56", vendor_id: "v12", category_id: "c6", name: "Netskope Web Filtering", description: "Cloud-based web filtering and policy enforcement.", sort_order: 4 },
  // Proofpoint
  { id: "p57", vendor_id: "v13", category_id: "c1", name: "Proofpoint Email Protection", description: "Email security gateway and threat protection.", sort_order: 1 },
  { id: "p58", vendor_id: "v13", category_id: "c1", name: "Proofpoint Data Loss Prevention", description: "Data loss prevention across email and cloud.", sort_order: 2 },
  { id: "p59", vendor_id: "v13", category_id: "c1", name: "Proofpoint TAP", description: "Targeted attack protection and threat intelligence.", sort_order: 3 },
  { id: "p60", vendor_id: "v13", category_id: "c1", name: "Proofpoint GRC", description: "Compliance and data governance platform.", sort_order: 4 },
  // Qualys
  { id: "p61", vendor_id: "v14", category_id: "c1", name: "Qualys VMDR", description: "Vulnerability management, detection, and response.", sort_order: 1 },
  { id: "p62", vendor_id: "v14", category_id: "c1", name: "Qualys Cloud Platform", description: "Cloud-based security and compliance platform.", sort_order: 2 },
  { id: "p63", vendor_id: "v14", category_id: "c1", name: "Qualys WAS", description: "Automated web application vulnerability scanning.", sort_order: 3 },
  { id: "p64", vendor_id: "v14", category_id: "c1", name: "Qualys Container Security", description: "Container image and Kubernetes security.", sort_order: 4 },
  // Rapid7
  { id: "p65", vendor_id: "v15", category_id: "c8", name: "Rapid7 InsightVM", description: "Vulnerability management and risk assessment.", sort_order: 1 },
  { id: "p66", vendor_id: "v15", category_id: "c8", name: "Rapid7 InsightIDR", description: "Cloud SIEM and threat detection.", sort_order: 2 },
  { id: "p67", vendor_id: "v15", category_id: "c8", name: "Rapid7 Metasploit", description: "Penetration testing and vulnerability validation.", sort_order: 3 },
  { id: "p68", vendor_id: "v15", category_id: "c8", name: "Rapid7 UAM", description: "Unified asset management platform.", sort_order: 4 },
  // Splunk
  { id: "p69", vendor_id: "v16", category_id: "c11", name: "Splunk Enterprise", description: "Platform for searching, monitoring, and analyzing machine data.", sort_order: 1 },
  { id: "p70", vendor_id: "v16", category_id: "c11", name: "Splunk Cloud", description: "Cloud-based Splunk platform service.", sort_order: 2 },
  { id: "p71", vendor_id: "v16", category_id: "c11", name: "Splunk Security Essentials", description: "Security use case guidance and content.", sort_order: 3 },
  { id: "p72", vendor_id: "v16", category_id: "c11", name: "Splunk ITSI", description: "IT service intelligence and AIOps.", sort_order: 4 },
  { id: "p73", vendor_id: "v16", category_id: "c11", name: "Splunk SOAR", description: "Security orchestration, automation, and response.", sort_order: 5 },
  // Nutanix
  { id: "p74", vendor_id: "v17", category_id: "c9", name: "Nutanix Cloud Platform", description: "Hyper-converged infrastructure and cloud platform.", sort_order: 1 },
  { id: "p75", vendor_id: "v17", category_id: "c9", name: "Nutanix Enterprise Cloud", description: "Enterprise cloud management and orchestration.", sort_order: 2 },
  { id: "p76", vendor_id: "v17", category_id: "c9", name: "Nutanix Leap", description: "Disaster recovery and data replication.", sort_order: 3 },
  { id: "p77", vendor_id: "v17", category_id: "c9", name: "Nutanix Files", description: "Scale-out file storage.", sort_order: 4 },
  { id: "p78", vendor_id: "v17", category_id: "c9", name: "Nutanix Flow", description: "Networking and security automation.", sort_order: 5 },
  // VMware
  { id: "p79", vendor_id: "v18", category_id: "c9", name: "VMware vSphere", description: "Server virtualization and cloud infrastructure.", sort_order: 1 },
  { id: "p80", vendor_id: "v18", category_id: "c9", name: "VMware NSX", description: "Network virtualization and security platform.", sort_order: 2 },
  { id: "p81", vendor_id: "v18", category_id: "c9", name: "VMware vSAN", description: "Hyper-converged storage for VMware environments.", sort_order: 3 },
  { id: "p82", vendor_id: "v18", category_id: "c9", name: "VMware Tanzu", description: "Container and modern application platform.", sort_order: 4 },
  { id: "p83", vendor_id: "v18", category_id: "c9", name: "VMware Horizon", description: "Virtual desktop infrastructure and application delivery.", sort_order: 5 },
  // Dell Technologies
  { id: "p84", vendor_id: "v19", category_id: "c9", name: "Dell PowerEdge", description: "Enterprise server portfolio.", sort_order: 1 },
  { id: "p85", vendor_id: "v19", category_id: "c9", name: "Dell PowerVault", description: "Storage systems and arrays.", sort_order: 2 },
  { id: "p86", vendor_id: "v19", category_id: "c9", name: "Dell EqualLogic", description: "SAN storage arrays.", sort_order: 3 },
  { id: "p87", vendor_id: "v19", category_id: "c9", name: "Dell PowerMax", description: "High-end storage array platform.", sort_order: 4 },
  // HPE
  { id: "p88", vendor_id: "v20", category_id: "c23", name: "HPE ProLiant", description: "Enterprise server portfolio.", sort_order: 1 },
  { id: "p89", vendor_id: "v20", category_id: "c23", name: "HPE Alletra", description: "Storage and data infrastructure.", sort_order: 2 },
  { id: "p90", vendor_id: "v20", category_id: "c23", name: "HPE SimpliVity", description: "Hyper-converged infrastructure.", sort_order: 3 },
  { id: "p91", vendor_id: "v20", category_id: "c23", name: "HPE GreenLake", description: "As-a-service consumption model for infrastructure.", sort_order: 4 },
  { id: "p92", vendor_id: "v20", category_id: "c23", name: "HPE Aruba", description: "Networking and edge-to-cloud solutions.", sort_order: 5 },
  // Red Hat
  { id: "p93", vendor_id: "v21", category_id: "c19", name: "Red Hat Enterprise Linux", description: "Enterprise Linux operating system.", sort_order: 1 },
  { id: "p94", vendor_id: "v21", category_id: "c19", name: "Red Hat OpenShift", description: "Kubernetes distribution and container platform.", sort_order: 2 },
  { id: "p95", vendor_id: "v21", category_id: "c19", name: "Red Hat Ansible Automation", description: "Automation platform and Ansible Automation Platform.", sort_order: 3 },
  { id: "p96", vendor_id: "v21", category_id: "c19", name: "Red Hat Virtualization", description: "Open-source virtualization platform.", sort_order: 4 },
  // Cohesity
  { id: "p97", vendor_id: "v22", category_id: "c19", name: "Cohesity SmartData", description: "Data management and protection platform.", sort_order: 1 },
  { id: "p98", vendor_id: "v22", category_id: "c19", name: "Cohesity DataProtect", description: "Backup and recovery solution.", sort_order: 2 },
  { id: "p99", vendor_id: "v22", category_id: "c19", name: "Cohesity DataRecover", description: "Disaster recovery and instant mass restore.", sort_order: 3 },
  { id: "p100", vendor_id: "v22", category_id: "c19", name: "Cohesity FortKnox", description: "Ransomware recovery with immutable backup.", sort_order: 4 },
  // Veeam
  { id: "p101", vendor_id: "v23", category_id: "c19", name: "Veeam Backup & Replication", description: "Backup and replication for virtual, cloud, and physical.", sort_order: 1 },
  { id: "p102", vendor_id: "v23", category_id: "c19", name: "Veeam Agent for Windows", description: "Backup agent for Windows workloads.", sort_order: 2 },
  { id: "p103", vendor_id: "v23", category_id: "c19", name: "Veeam Cloud Connect", description: "Service provider backup and disaster recovery.", sort_order: 3 },
  { id: "p104", vendor_id: "v23", category_id: "c19", name: "Veeam ONE", description: "Data center monitoring and optimization.", sort_order: 4 },
  // Rubrik
  { id: "p105", vendor_id: "v24", category_id: "c19", name: "Rubrik Security Cloud", description: "Data security and backup platform.", sort_order: 1 },
  { id: "p106", vendor_id: "v24", category_id: "c19", name: "Rubrik CDM", description: "Cloud data management.", sort_order: 2 },
  { id: "p107", vendor_id: "v24", category_id: "c19", name: "Rubrik Polaris", description: "Data security posture management.", sort_order: 3 },
  // Commvault
  { id: "p108", vendor_id: "v25", category_id: "c19", name: "Commvault Complete Backup & Recovery", description: "Enterprise backup and recovery platform.", sort_order: 1 },
  { id: "p109", vendor_id: "v25", category_id: "c19", name: "Commvault Metallic", description: "SaaS-based backup and recovery.", sort_order: 2 },
  { id: "p110", vendor_id: "v25", category_id: "c19", name: "Commvault HyperProtect", description: "Ransomware protection and immutable storage.", sort_order: 3 },
  { id: "p111", vendor_id: "v25", category_id: "c19", name: "Commvault Cloud Services", description: "Cloud data management and protection.", sort_order: 4 },
];

export const seedCapabilities: Capability[] = [
  { id: "cap1", name: "Architecture", name_ar: "الهندسة المعمارية", description: "Technology architecture design, solution architecture, and reference architecture.", sort_order: 1 },
  { id: "cap2", name: "Assessment", name_ar: "التقييم", description: "Technology assessment, maturity assessment, and readiness evaluation.", sort_order: 2 },
  { id: "cap3", name: "Design", name_ar: "التصميم", description: "Detailed design, solution design, and technical design services.", sort_order: 3 },
  { id: "cap4", name: "Installation", name_ar: "التثبيت", description: "Hardware/software installation, deployment, and commissioning.", sort_order: 4 },
  { id: "cap5", name: "Implementation", name_ar: "التنفيذ", description: "Full implementation lifecycle from planning to go-live.", sort_order: 5 },
  { id: "cap6", name: "Configuration", name_ar: "التهيئة", description: "System configuration, tuning, and customization.", sort_order: 6 },
  { id: "cap7", name: "Integration", name_ar: "التكامل", description: "System integration, API integration, and interoperability.", sort_order: 7 },
  { id: "cap8", name: "Migration", name_ar: "الهجرة", description: "Technology migration, data migration, and platform transition.", sort_order: 8 },
  { id: "cap9", name: "Upgrade", name_ar: "الترقية", description: "Version upgrades, patch management, and modernization.", sort_order: 9 },
  { id: "cap10", name: "Troubleshooting", name_ar: "استكشاف الأخطاء وإصلاحها", description: "Issue diagnosis, problem resolution, and root cause analysis.", sort_order: 10 },
  { id: "cap11", name: "Administration", name_ar: "الإدارة", description: "Ongoing administration, management, and operational support.", sort_order: 11 },
  { id: "cap12", name: "Operations", name_ar: "العمليات", description: "Day-to-day operations, NOC/SOC, and managed operations.", sort_order: 12 },
  { id: "cap13", name: "Optimization", name_ar: "التحسين", description: "Performance optimization, cost optimization, and efficiency improvements.", sort_order: 13 },
  { id: "cap14", name: "Health Check", name_ar: "فحص الصحة", description: "System health assessment, audit, and compliance verification.", sort_order: 14 },
  { id: "cap15", name: "Consulting", name_ar: "الاستشارات", description: "Advisory, guidance, and recommendations from subject matter experts.", sort_order: 15 },
  { id: "cap16", name: "Professional Services", name_ar: "الخدمات المهنية", description: "Professional services engagement including scoping, delivery, and support.", sort_order: 16 },
  { id: "cap17", name: "Presales", name_ar: "ما قبل البيع", description: "Pre-sales architecture, scoping, and technical sales support.", sort_order: 17 },
  { id: "cap18", name: "Training", name_ar: "التدريب", description: "Technology training, certification, and capability building.", sort_order: 18 },
  { id: "cap19", name: "Support", name_ar: "الدعم", description: "Technical support, break-fix, and help desk services.", sort_order: 19 },
  { id: "cap20", name: "Project Leadership", name_ar: "قيادة المشاريع", description: "Project management, program leadership, and delivery oversight.", sort_order: 20 },
];

export const seedAliases: Alias[] = [
  { id: "a1", canonical_name: "Prisma Cloud", alias: "Prisma", alias_type: "abbreviation" },
  { id: "a2", canonical_name: "Cortex XDR", alias: "Cortex", alias_type: "abbreviation" },
  { id: "a3", canonical_name: "Prisma SASE", alias: "Prisma Access", alias_type: "alternative" },
  { id: "a4", canonical_name: "Cortex XSOAR", alias: "Demisto", alias_type: "historical" },
  { id: "a5", canonical_name: "FortiGate", alias: "Fortigate", alias_type: "common_misspelling" },
  { id: "a6", canonical_name: "Fortinet Security Fabric", alias: "Security Fabric", alias_type: "alternative" },
  { id: "a7", canonical_name: "Cisco Meraki", alias: "Meraki", alias_type: "abbreviation" },
  { id: "a8", canonical_name: "Cisco SD-WAN", alias: "Viptela", alias_type: "historical" },
  { id: "a9", canonical_name: "Cisco Umbrella", alias: "OpenDNS", alias_type: "historical" },
  { id: "a10", canonical_name: "Falcon Prevent", alias: "Falcon", alias_type: "abbreviation" },
  { id: "a11", canonical_name: "CrowdStrike Falcon", alias: "Falcon Platform", alias_type: "alternative" },
  { id: "a12", canonical_name: "Microsoft Entra ID", alias: "Azure AD", alias_type: "historical" },
  { id: "a13", canonical_name: "Microsoft Entra ID", alias: "Entra", alias_type: "abbreviation" },
  { id: "a14", canonical_name: "Microsoft 365", alias: "M365", alias_type: "abbreviation" },
  { id: "a15", canonical_name: "Splunk Enterprise", alias: "Splunk", alias_type: "abbreviation" },
  { id: "a16", canonical_name: "Splunk SOAR", alias: "Splunk Phantom", alias_type: "historical" },
  { id: "a17", canonical_name: "VMware vSphere", alias: "ESXi", alias_type: "alternative" },
  { id: "a18", canonical_name: "VMware Tanzu", alias: "Tanzu", alias_type: "abbreviation" },
  { id: "a19", canonical_name: "Red Hat OpenShift", alias: "OpenShift", alias_type: "abbreviation" },
  { id: "a20", canonical_name: "Red Hat Enterprise Linux", alias: "RHEL", alias_type: "abbreviation" },
  { id: "a21", canonical_name: "Check Point Infinity", alias: "Infinity", alias_type: "abbreviation" },
  { id: "a22", canonical_name: "Zscaler Internet Access", alias: "ZIA", alias_type: "abbreviation" },
  { id: "a23", canonical_name: "Zscaler Private Access", alias: "ZPA", alias_type: "abbreviation" },
  { id: "a24", canonical_name: "F5 BIG-IP", alias: "BIG-IP", alias_type: "abbreviation" },
];

export const seedProductCapabilities: { product_id: string; capability_id: string; proficiency_level: string }[] = [
  { product_id: "p1", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p1", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p1", capability_id: "cap6", proficiency_level: "Advanced" },
  { product_id: "p2", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p2", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p2", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p3", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p3", capability_id: "cap6", proficiency_level: "Advanced" },
  { product_id: "p3", capability_id: "cap7", proficiency_level: "Intermediate" },
  { product_id: "p4", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p4", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p5", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p5", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p5", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p6", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p6", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p6", capability_id: "cap13", proficiency_level: "Intermediate" },
  { product_id: "p7", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p7", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p7", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p8", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p8", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p9", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p9", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p10", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p10", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p11", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p11", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p11", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p12", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p12", capability_id: "cap12", proficiency_level: "Expert" },
  { product_id: "p13", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p13", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p14", capability_id: "cap6", proficiency_level: "Advanced" },
  { product_id: "p14", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p15", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p15", capability_id: "cap12", proficiency_level: "Expert" },
  { product_id: "p16", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p16", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p16", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p17", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p17", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p18", capability_id: "cap15", proficiency_level: "Expert" },
  { product_id: "p19", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p19", capability_id: "cap13", proficiency_level: "Advanced" },
  { product_id: "p20", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p20", capability_id: "cap6", proficiency_level: "Advanced" },
  { product_id: "p21", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p21", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p21", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p22", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p22", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p23", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p23", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p24", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p24", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p25", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p25", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p25", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p26", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p26", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p26", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p27", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p27", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p28", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p28", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p28", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p29", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p29", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p29", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p30", capability_id: "cap7", proficiency_level: "Intermediate" },
  { product_id: "p30", capability_id: "cap16", proficiency_level: "Advanced" },
  { product_id: "p31", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p31", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p31", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p32", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p32", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p32", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p33", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p33", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p34", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p34", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p35", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p35", capability_id: "cap10", proficiency_level: "Advanced" },
  { product_id: "p36", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p36", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p36", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p37", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p37", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p37", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p38", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p38", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p39", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p39", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p40", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p40", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p41", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p41", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p41", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p42", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p42", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p43", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p43", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p43", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p44", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p44", capability_id: "cap12", proficiency_level: "Advanced" },
  { product_id: "p45", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p45", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p45", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p46", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p46", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p46", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p47", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p47", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p48", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p48", capability_id: "cap2", proficiency_level: "Advanced" },
  { product_id: "p49", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p49", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p49", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p50", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p50", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p51", capability_id: "cap10", proficiency_level: "Advanced" },
  { product_id: "p51", capability_id: "cap13", proficiency_level: "Expert" },
  { product_id: "p52", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p52", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p53", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p53", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p53", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p54", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p54", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p54", capability_id: "cap13", proficiency_level: "Advanced" },
  { product_id: "p55", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p55", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p55", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p56", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p56", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p57", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p57", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p57", capability_id: "cap10", proficiency_level: "Advanced" },
  { product_id: "p58", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p58", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p58", capability_id: "cap15", proficiency_level: "Advanced" },
  { product_id: "p59", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p59", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p59", capability_id: "cap15", proficiency_level: "Expert" },
  { product_id: "p60", capability_id: "cap15", proficiency_level: "Expert" },
  { product_id: "p60", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p61", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p61", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p61", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p62", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p62", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p63", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p63", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p63", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p64", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p64", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p64", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p65", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p65", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p65", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p66", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p66", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p66", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p67", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p67", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p67", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p68", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p68", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p69", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p69", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p69", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p70", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p70", capability_id: "cap10", proficiency_level: "Expert" },
  { product_id: "p70", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p71", capability_id: "cap15", proficiency_level: "Expert" },
  { product_id: "p71", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p72", capability_id: "cap13", proficiency_level: "Expert" },
  { product_id: "p72", capability_id: "cap2", proficiency_level: "Advanced" },
  { product_id: "p73", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p73", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p74", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p74", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p74", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p75", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p75", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p75", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p76", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p76", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p77", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p77", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p78", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p78", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p79", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p79", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p79", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p80", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p80", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p80", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p81", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p81", capability_id: "cap4", proficiency_level: "Advanced" },
  { product_id: "p82", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p82", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p82", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p83", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p83", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p84", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p84", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p85", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p85", capability_id: "cap4", proficiency_level: "Advanced" },
  { product_id: "p86", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p86", capability_id: "cap4", proficiency_level: "Advanced" },
  { product_id: "p87", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p87", capability_id: "cap4", proficiency_level: "Advanced" },
  { product_id: "p88", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p88", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p89", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p89", capability_id: "cap4", proficiency_level: "Advanced" },
  { product_id: "p90", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p90", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p91", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p91", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p91", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p92", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p92", capability_id: "cap7", proficiency_level: "Advanced" },
  { product_id: "p93", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p93", capability_id: "cap4", proficiency_level: "Expert" },
  { product_id: "p93", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p94", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p94", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p94", capability_id: "cap3", proficiency_level: "Advanced" },
  { product_id: "p95", capability_id: "cap7", proficiency_level: "Expert" },
  { product_id: "p95", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p95", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p96", capability_id: "cap3", proficiency_level: "Expert" },
  { product_id: "p96", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p97", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p97", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p97", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p98", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p98", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p98", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p99", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p99", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p100", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p100", capability_id: "cap12", proficiency_level: "Expert" },
  { product_id: "p100", capability_id: "cap13", proficiency_level: "Intermediate" },
  { product_id: "p101", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p101", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p101", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p102", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p102", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p103", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p103", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p104", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p104", capability_id: "cap12", proficiency_level: "Advanced" },
  { product_id: "p104", capability_id: "cap13", proficiency_level: "Intermediate" },
  { product_id: "p105", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p105", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p105", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p106", capability_id: "cap5", proficiency_level: "Expert" },
  { product_id: "p106", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p106", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p107", capability_id: "cap1", proficiency_level: "Expert" },
  { product_id: "p107", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p107", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p108", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p108", capability_id: "cap11", proficiency_level: "Expert" },
  { product_id: "p108", capability_id: "cap14", proficiency_level: "Expert" },
  { product_id: "p109", capability_id: "cap8", proficiency_level: "Expert" },
  { product_id: "p109", capability_id: "cap11", proficiency_level: "Advanced" },
  { product_id: "p110", capability_id: "cap2", proficiency_level: "Expert" },
  { product_id: "p110", capability_id: "cap5", proficiency_level: "Advanced" },
  { product_id: "p110", capability_id: "cap14", proficiency_level: "Expert" },
];

// ── Lookup helpers ──
export function getDomainByName(name: string): Domain | undefined {
  return seedDomains.find(d => d.name.toLowerCase() === name.toLowerCase());
}

export function getDomainById(id: string): Domain | undefined {
  return seedDomains.find(d => d.id === id);
}

export function getCategoriesByDomain(domainId: string): Category[] {
  return seedCategories.filter(c => c.domain_id === domainId).sort((a, b) => a.sort_order - b.sort_order);
}

export function getCategoriesByDomainName(domainName: string): Category[] {
  const domain = getDomainByName(domainName);
  if (!domain) return [];
  return seedCategories.filter(c => c.domain_id === domain.id).sort((a, b) => a.sort_order - b.sort_order);
}

export function getVendorById(id: string): Vendor | undefined {
  return seedVendors.find(v => v.id === id);
}

export function getVendorByName(name: string): Vendor | undefined {
  return seedVendors.find(v => v.name.toLowerCase() === name.toLowerCase());
}

export function getVendorProducts(vendorId: string): Product[] {
  return seedProducts.filter(p => p.vendor_id === vendorId).sort((a, b) => a.sort_order - b.sort_order);
}

export function getVendorProductsByName(vendorName: string): Product[] {
  const vendor = getVendorByName(vendorName);
  if (!vendor) return [];
  return getVendorProducts(vendor.id);
}

export function getProductById(id: string): Product | undefined {
  return seedProducts.find(p => p.id === id);
}

export function getProductByName(name: string): Product | undefined {
  return seedProducts.find(p => p.name.toLowerCase() === name.toLowerCase());
}

export function getProductsByCategory(categoryId: string): Product[] {
  return seedProducts.filter(p => p.category_id === categoryId).sort((a, b) => a.sort_order - b.sort_order);
}

export function getProductCapabilities(productId: string): { product: Product; capability: Capability; proficiency_level: string }[] {
  const mappings = seedProductCapabilities.filter(m => m.product_id === productId);
  return mappings.map(m => ({
    product: getProductById(productId)!,
    capability: seedCapabilities.find(c => c.id === m.capability_id)!,
    proficiency_level: m.proficiency_level,
  })).filter(x => x.product && x.capability);
}

export function getCapabilityById(id: string): Capability | undefined {
  return seedCapabilities.find(c => c.id === id);
}

export function getCapabilityByName(name: string): Capability | undefined {
  return seedCapabilities.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export function searchAll(query: string): {
  domains: Domain[];
  categories: Category[];
  vendors: Vendor[];
  products: Product[];
  capabilities: Capability[];
} {
  const q = query.toLowerCase().trim();
  if (!q) return { domains: [], categories: [], vendors: [], products: [], capabilities: [] };

  return {
    domains: seedDomains.filter(d => d.name.toLowerCase().includes(q) || d.name_ar.includes(q)),
    categories: seedCategories.filter(c => c.name.toLowerCase().includes(q) || c.name_ar.includes(q) || c.description.toLowerCase().includes(q)),
    vendors: seedVendors.filter(v => v.name.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)),
    products: seedProducts.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    capabilities: seedCapabilities.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)),
  };
}

export function getStats() {
  return {
    domains: seedDomains.length,
    categories: seedCategories.length,
    vendors: seedVendors.length,
    products: seedProducts.length,
    capabilities: seedCapabilities.length,
    aliases: seedAliases.length,
    product_capabilities: seedProductCapabilities.length,
  };
}
