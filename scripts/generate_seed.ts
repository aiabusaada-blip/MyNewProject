// Nujeel Phase 2: Technology Capability Graph — Seed Data Generator
// Generates INSERT statements for all taxonomy tables

import { writeFileSync } from "fs";

// ── TECHNOLOGY DOMAINS ──
const domains = [
  { name: "Cybersecurity", name_ar: "الأمن السيبراني", description: "Information security, threat detection, identity & access management, encryption, and security operations." },
  { name: "Infrastructure", name_ar: "البنية التحتية", description: "Server hardware, storage systems, networking equipment, and physical data center infrastructure." },
  { name: "Cloud", name_ar: "السحابة", description: "Cloud platforms, hybrid cloud, multi-cloud strategies, cloud migration, and cloud-native services." },
  { name: "Networking", name_ar: "الشبكات", description: "LAN/WAN, SD-WAN, SASE, network design, routing, switching, and network services." },
  { name: "Backup & Data Protection", name_ar: "النسخ الاحتياطي وحماية البيانات", description: "Backup solutions, data replication, disaster recovery, archival, and data resilience." },
  { name: "DevOps", name_ar: "ديفأبس", description: "CI/CD pipelines, infrastructure as code, automation, containerization, and developer tooling." },
  { name: "Kubernetes", name_ar: "كوبرناتس", description: "Container orchestration, cluster management, Helm charts, service mesh, and cloud-native platforms." },
  { name: "AI", name_ar: "الذكاء الاصطناعي", description: "Artificial intelligence, machine learning, generative AI, MLOps, and AI-powered services." },
  { name: "Data & Analytics", name_ar: "البيانات والتحليلات", description: "Data warehouses, data lakes, BI platforms, analytics pipelines, and data engineering." },
  { name: "Observability", name_ar: "المراقبة والرصد", description: "Monitoring, logging, tracing, metrics, alerting, and full-stack observability platforms." },
  { name: "IAM", name_ar: "إدارة الهوية والوصول", description: "Identity and access management, SSO, MFA, privileged access, and zero trust architecture." },
  { name: "Digital Transformation", name_ar: "التحول الرقمي", description: "Business process modernization, DX strategy, change management, and enterprise modernization." },
  { name: "Consulting Services", name_ar: "خدمات الاستشارات", description: "Technology advisory, strategy consulting, implementation services, and managed services." },
];

// ── TECHNOLOGY CATEGORIES ──
const categories = {
  "Cybersecurity": [
    { name: "Vulnerability Management", name_ar: "إدارة الثغرات", description: "Vulnerability scanning, assessment, and remediation management." },
    { name: "Endpoint Security", name_ar: "أمن نقاط النهاية", description: "EDR, XDR, endpoint protection, and device security." },
    { name: "Network Security", name_ar: "أمن الشبكات", description: "Firewalls, NGFW, network segmentation, and intrusion prevention." },
    { name: "Cloud Security", name_ar: "أمن السحابة", description: "Cloud security posture management, CSPM, and cloud workload protection." },
    { name: "Identity & Access Security", name_ar: "أمن الهوية والوصول", description: "IAM security, privileged access management, and identity threat detection." },
    { name: " Email Security", name_ar: "أمن البريد الإلكتروني", description: "Email gateway, anti-phishing, and email threat protection." },
    { name: "Zero Trust", name_ar: "الثقة الصفرية", description: "Zero trust architecture, micro-segmentation, and continuous verification." },
    { name: "Security Operations", name_ar: "عمليات الأمن", description: "SIEM, SOAR, threat intelligence, and security operations center services." },
  ],
  "Infrastructure": [
    { name: "Server Infrastructure", name_ar: "بنية الخوادم", description: "Physical servers, rack servers, blade servers, and server management." },
    { name: "Storage Infrastructure", name_ar: "بنية التخزين", description: "SAN, NAS, hyper-converged storage, and storage networking." },
    { name: "Data Center", name_ar: "مراكز البيانات", description: "Data center design, facilities, power, cooling, and colocation." },
  ],
  "Cloud": [
    { name: "Public Cloud Platforms", name_ar: "منصات السحابة العامة", description: "AWS, Azure, GCP, and other public cloud provider services." },
    { name: "Hybrid & Multi-Cloud", name_ar: "السحابة الهجينة والمتعددة", description: "Hybrid cloud architecture, multi-cloud management, and cloud federation." },
    { name: "Cloud Migration", name_ar: "انتقال السحابة", description: "Lift-and-shift, re-platforming, and cloud-native migration strategies." },
    { name: "Cloud-Native Services", name_ar: "خدمات السحابة الأصلية", description: "Serverless, managed services, container platforms, and cloud-native architecture." },
  ],
  "Networking": [
    { name: "Enterprise Networking", name_ar: "الشبكات المؤسسية", description: "Campus LAN, SD-WAN, switching, and routing." },
    { name: "Network Security Services", name_ar: "خدمات أمن الشبكات", description: "FWaaS, ZTNA, SASE, and secure access service edge." },
    { name: "Unified Communications", name_ar: "الاتصالات الموحدة", description: "Voice, video, collaboration, and UC platforms." },
  ],
  "Backup & Data Protection": [
    { name: "Backup Solutions", name_ar: "حلول النسخ الاحتياطي", description: "Backup software, backup appliances, and backup-as-a-service." },
    { name: "Disaster Recovery", name_ar: "الاستعادة من الكوارث", description: "DR planning, DR-as-a-service, and business continuity." },
    { name: "Data Resilience", name_ar: "مرونة البيانات", description: "Ransomware protection, immutable backups, and data integrity." },
  ],
  "DevOps": [
    { name: "CI/CD & Automation", name_ar: "النسخ المستمر والأتمتة", description: "Jenkins, GitLab CI, GitHub Actions, and automation pipelines." },
    { name: "Infrastructure as Code", name_ar: "بنية Terraform ككود", description: "Terraform, Ansible, CloudFormation, and declarative infrastructure." },
    { name: "Containerization", name_ar: "التجميع", description: "Docker, Podman, container runtimes, and container security." },
  ],
  "Kubernetes": [
    { name: "Cluster Management", name_ar: "إدارة المجمعات", description: "EKS, AKS, GKE, Rancher, OpenShift, and cluster operations." },
    { name: "Service Mesh", name_ar: "شبكة الخدمات", description: "Istio, Linkerd, Consul Connect, and service mesh architectures." },
    { name: "Container Platforms", name_ar: "منصات الحاويات", description: "Platform engineering, internal developer platforms, and Kubernetes distributions." },
  ],
  "AI": [
    { name: "Generative AI", name_ar: "الذكاء الاصطناعي التوليدي", description: "LLMs, prompt engineering, RAG, and generative AI applications." },
    { name: "Machine Learning Operations", name_ar: "عمليات تعلم الآلة", description: "MLOps, model deployment, model monitoring, and ML pipelines." },
    { name: "AI Platforms & Tools", name_ar: "منصات وأدوات الذكاء الاصطناعي", description: "AI development platforms, vector databases, and AI tooling." },
  ],
  "Data & Analytics": [
    { name: "Data Warehousing", name_ar: "خزن البيانات", description: "Snowflake, Redshift, BigQuery, and cloud data warehouses." },
    { name: "BI & Visualization", name_ar: "الأعمال والبصريات", description: "Power BI, Tableau, Looker, and business intelligence dashboards." },
    { name: "Data Engineering", name_ar: "هندسة البيانات", description: "ETL/ELT pipelines, data lakes, data mesh, and stream processing." },
  ],
  "Observability": [
    { name: "Application Monitoring", name_ar: "مراقبة التطبيقات", description: "APM, distributed tracing, and application performance monitoring." },
    { name: "Infrastructure Monitoring", name_ar: "مراقبة البنية التحتية", description: "Infrastructure metrics, cloud monitoring, and infrastructure observability." },
    { name: "Logging & Tracing", name_ar: "السجلات والتتبع", description: "Centralized logging, log analytics, and distributed tracing platforms." },
  ],
  "IAM": [
    { name: "Identity Management", name_ar: "إدارة الهوية", description: "Directory services, identity governance, and lifecycle management." },
    { name: "Access Management", name_ar: "إدارة الوصول", description: "SSO, MFA, adaptive authentication, and access governance." },
    { name: "Privileged Access", name_ar: "الوصول ذو الامتياز", description: "PAM, secrets management, and privileged session management." },
  ],
  "Digital Transformation": [
    { name: "Strategy & Roadmap", name_ar: "الاستراتيجية والخارطة الطريق", description: "DX strategy, business case development, and transformation roadmap." },
    { name: "Process Modernization", name_ar: "تحديث العمليات", description: "Business process reengineering, workflow automation, and digital processes." },
    { name: "Change Management", name_ar: "إدارة التغيير", description: "Organizational change, user adoption, and transformation enablement." },
  ],
  "Consulting Services": [
    { name: "Technology Advisory", name_ar: "الاستشارات التقنية", description: "Technology strategy, architecture advisory, and technology selection." },
    { name: "Implementation Services", name_ar: "خدمات التنفيذ", description: "System implementation, integration, and deployment services." },
    { name: "Managed Services", name_ar: "الخدمات المدارة", description: "Managed infrastructure, managed security, and ongoing operations support." },
  ],
};

// ── VENDORS ──
const vendors = [
  { name: "Tenable", description: "Cybersecurity risk detection and exposure management." },
  { name: "Palo Alto Networks", description: "Next-generation firewalls, cloud security, and XDR platforms." },
  { name: "Fortinet", description: "Integrated network security fabric, firewalls, and SD-WAN." },
  { name: "CrowdStrike", description: "Cloud-native endpoint protection, threat intelligence, and XDR." },
  { name: "CyberArk", description: "Privileged access management and identity security." },
  { name: "Microsoft", description: "Cloud platforms, productivity, security, and enterprise software." },
  { name: "Cisco", description: "Networking, collaboration, and enterprise security solutions." },
  { name: "Check Point", description: "Next-generation firewalls and threat prevention." },
  { name: "F5", description: "Application delivery, WAF, and API security." },
  { name: "Imperva", description: "Data security, web application firewall, and DDoS protection." },
  { name: "Zscaler", description: "Cloud security, SASE, and zero trust network access." },
  { name: "Netskope", description: "Cloud access security broker, SASE, and data protection." },
  { name: "Proofpoint", description: "Email security, data loss prevention, and compliance." },
  { name: "Qualys", description: "Cloud-based vulnerability management and compliance." },
  { name: "Rapid7", description: "Vulnerability management, detection, and response." },
  { name: "Splunk", description: "SIEM, observability, and security analytics." },
  { name: "Nutanix", description: "Hyper-converged infrastructure and cloud platforms." },
  { name: "VMware", description: " virtualization, cloud infrastructure, and modern applications." },
  { name: "Dell Technologies", description: "Server, storage, and data center infrastructure." },
  { name: "HPE", description: "Servers, storage, and hybrid cloud infrastructure." },
  { name: "Red Hat", description: "Open-source enterprise platforms, Linux, and Kubernetes." },
  { name: "Cohesity", description: "Data management, backup, and ransomware protection." },
  { name: "Veeam", description: "Backup, recovery, and data resilience for virtual/cloud environments." },
  { name: "Rubrik", description: "Ransomware recovery, backup, and data security." },
  { name: "Commvault", description: "Data protection, backup, and information management." },
];

// ── CAPABILITY TYPES ──
const capabilities = [
  { name: "Architecture", description: "Technology architecture design, solution architecture, and reference architecture." },
  { name: "Assessment", description: "Technology assessment, maturity assessment, and readiness evaluation." },
  { name: "Design", description: "Detailed design, solution design, and technical design services." },
  { name: "Installation", description: "Hardware/software installation, deployment, and commissioning." },
  { name: "Implementation", description: "Full implementation lifecycle from planning to go-live." },
  { name: "Configuration", description: "System configuration, tuning, and customization." },
  { name: "Integration", description: "System integration, API integration, and interoperability." },
  { name: "Migration", description: "Technology migration, data migration, and platform transition." },
  { name: "Upgrade", description: "Version upgrades, patch management, and modernization." },
  { name: "Troubleshooting", description: "Issue diagnosis, problem resolution, and root cause analysis." },
  { name: "Administration", description: "Ongoing administration, management, and operational support." },
  { name: "Operations", description: "Day-to-day operations, NOC/SOC, and managed operations." },
  { name: "Optimization", description: "Performance optimization, cost optimization, and efficiency improvements." },
  { name: "Health Check", description: "System health assessment, audit, and compliance verification." },
  { name: "Consulting", description: "Advisory, guidance, and recommendations from subject matter experts." },
  { name: "Professional Services", description: "Professional services engagement including scoping, delivery, and support." },
  { name: "Presales", description: "Pre-sales architecture, scoping, and technical sales support." },
  { name: "Training", description: "Technology training, certification, and capability building." },
  { name: "Support", description: "Technical support, break-fix, and help desk services." },
  { name: "Project Leadership", description: "Project management, program leadership, and delivery oversight." },
];

// ── PRODUCTS per vendor (a representative set) ──
const vendorProducts = {
  "Tenable": [
    { name: "Tenable One", description: "Exposure management platform for cyber risk visibility." },
    { name: "Tenable Nessus", description: "Vulnerability scanning and assessment." },
    { name: "Tenable.io", description: "Web application and cloud vulnerability management." },
    { name: "Tenable.sc", description: "Security center for continuous security monitoring." },
  ],
  "Palo Alto Networks": [
    { name: "Next-Generation Firewall", description: "NGFW with threat prevention and URL filtering." },
    { name: "Cortex XDR", description: "Extended detection and response platform." },
    { name: "Prisma Cloud", description: "Cloud security platform (CNAPP/CSPM)." },
    { name: "Prisma SASE", description: "Secure access service edge platform." },
    { name: "Strata", description: "Network security operating system." },
    { name: "Cortex XSOAR", description: "Security orchestration, automation, and response." },
  ],
  "Fortinet": [
    { name: "FortiGate", description: "Next-generation firewall and SD-WAN platform." },
    { name: "FortiAnalyzer", description: "Centralized log analysis and reporting." },
    { name: "FortiSIEM", description: "Security information and event management." },
    { name: "FortiClient", description: "Endpoint protection and Zero Trust network access." },
    { name: "FortiManager", description: "Centralized device management and administration." },
  ],
  "CrowdStrike": [
    { name: "Falcon Prevent", description: "Next-gen antivirus and endpoint protection." },
    { name: "Falcon Insight", description: "EDR with threat detection and response." },
    { name: "Falcon OverWatch", description: "Managed threat hunting service." },
    { name: "Falcon Complete", description: "Managed endpoint protection and response." },
    { name: "CrowdStrike Falcon", description: "Cloud-native security platform." },
  ],
  "CyberArk": [
    { name: "Privileged Access Manager", description: "Privileged account and session management." },
    { name: "CyberArk Conjur", description: "Secrets management for applications and infrastructure." },
    { name: "CyberArk Secure Web Sessions", description: "Secure remote access for web applications." },
    { name: "CyberArk Alero", description: "Zero trust access for remote vendors." },
  ],
  "Microsoft": [
    { name: "Microsoft 365", description: "Cloud-based productivity and collaboration suite." },
    { name: "Azure", description: "Cloud computing platform and services." },
    { name: "Microsoft Entra ID", description: "Identity and access management (Azure AD)." },
    { name: "Microsoft Defender", description: "Endpoint and cloud threat protection." },
    { name: "Microsoft Sentinel", description: "Cloud-native SIEM and SOAR solution." },
    { name: "Power Platform", description: "Low-code platform for business applications." },
  ],
  "Cisco": [
    { name: "Cisco Secure Firewall", description: "Next-generation firewalls and threat defense." },
    { name: "Cisco Meraki", description: "Cloud-managed networking and security." },
    { name: "Cisco SD-WAN", description: "Software-defined wide area networking." },
    { name: "Cisco Webex", description: "Collaboration and unified communications." },
    { name: "Cisco Umbrella", description: "Cloud-delivered secure internet gateway." },
    { name: "Cisco ACI", description: "Application centric infrastructure for data centers." },
  ],
  "Check Point": [
    { name: "Check Point Infinity", description: "Consolidated threat prevention architecture." },
    { name: "Check Point Quantum", description: "Next-generation firewall platform." },
    { name: "Check Point Harmony", description: "Unified endpoint and email security." },
    { name: "Check Point CloudGuard", description: "Cloud security and workload protection." },
  ],
  "F5": [
    { name: "F5 BIG-IP", description: "Application delivery controller and WAF." },
    { name: "F5 Advanced WAF", description: "Web application firewall protection." },
    { name: "F5 Distributed Cloud", description: "Multi-cloud application delivery and security." },
    { name: "F5 BIG-IQ", description: "Centralized management and analytics." },
  ],
  "Imperva": [
    { name: "Imperva SecureSphere", description: "Web application firewall and database security." },
    { name: "Imperva Data Security", description: "Data security and analytics platform." },
    { name: "Imperva Cloud WAF", description: "Cloud-based web application firewall." },
    { name: "Imperva Sonar", description: "Data security posture management." },
  ],
  "Zscaler": [
    { name: "Zscaler Internet Access", description: "Cloud-delivered secure internet access." },
    { name: "Zscaler Private Access", description: "Zero trust private application access." },
    { name: "Zscaler Digital Experience", description: "Digital experience monitoring and analytics." },
    { name: "Zscaler Cloud Sandbox", description: "Threat detection and analysis sandbox." },
  ],
  "Netskope": [
    { name: "Netskope Security Platform", description: "Cloud access security broker and security platform." },
    { name: "Netskope SASE", description: "Secure access service edge platform." },
    { name: "Netskope Data Loss Prevention", description: "Data protection and DLP for cloud apps." },
    { name: "Netskope Web Filtering", description: "Cloud-based web filtering and policy enforcement." },
  ],
  "Proofpoint": [
    { name: "Proofpoint Email Protection", description: "Email security gateway and threat protection." },
    { name: "Proofpoint Data Loss Prevention", description: "Data loss prevention across email and cloud." },
    { name: "Proofpoint TAP", description: "Targeted attack protection and threat intelligence." },
    { name: "Proofpoint Governance, Risk & Compliance", description: "Compliance and data governance platform." },
  ],
  "Qualys": [
    { name: "Qualys VMDR", description: "Vulnerability management, detection, and response." },
    { name: "Qualys Cloud Platform", description: "Cloud-based security and compliance platform." },
    { name: "Qualys Web Application Scanning", description: "Automated web application vulnerability scanning." },
    { name: "Qualys Container Security", description: "Container image and Kubernetes security." },
  ],
  "Rapid7": [
    { name: "Rapid7 InsightVM", description: "Vulnerability management and risk assessment." },
    { name: "Rapid7 InsightIDR", description: "Cloud SIEM and threat detection." },
    { name: "Rapid7 Metasploit", description: "Penetration testing and vulnerability validation." },
    { name: "Rapid7 Unified Asset Management", description: "Asset discovery and management platform." },
  ],
  "Splunk": [
    { name: "Splunk Enterprise", description: "Platform for searching, monitoring, and analyzing machine data." },
    { name: "Splunk Cloud", description: "Cloud-based Splunk platform service." },
    { name: "Splunk Security Essentials", description: "Security use case guidance and content." },
    { name: "Splunk ITSI", description: "IT service intelligence and AIOps." },
    { name: "Splunk SOAR", description: "Security orchestration, automation, and response." },
  ],
  "Nutanix": [
    { name: "Nutanix Cloud Platform", description: "Hyper-converged infrastructure and cloud platform." },
    { name: "Nutanix Enterprise Cloud", description: "Enterprise cloud management and orchestration." },
    { name: "Nutanix Leap", description: "Disaster recovery and data replication." },
    { name: "Nutanix Files", description: "Scale-out file storage." },
    { name: "Nutanix Flow", description: "Networking and security automation." },
  ],
  "VMware": [
    { name: "VMware vSphere", description: "Server virtualization and cloud infrastructure." },
    { name: "VMware NSX", description: "Network virtualization and security platform." },
    { name: "VMware vSAN", description: "Hyper-converged storage for VMware environments." },
    { name: "VMware Tanzu", description: "Container and modern application platform." },
    { name: "VMware Horizon", description: "Virtual desktop infrastructure and application delivery." },
  ],
  "Dell Technologies": [
    { name: "Dell PowerEdge", description: "Enterprise server portfolio." },
    { name: "Dell PowerVault", description: "Storage systems and arrays." },
    { name: "Dell EqualLogic", description: "SAN storage arrays." },
    { name: "Dell PowerMax", description: "High-end storage array platform." },
  ],
  "HPE": [
    { name: "HPE ProLiant", description: "Enterprise server portfolio." },
    { name: "HPE Alletra", description: "Storage and data infrastructure." },
    { name: "HPE SimpliVity", description: "Hyper-converged infrastructure." },
    { name: "HPE GreenLake", description: "As-a-service consumption model for infrastructure." },
    { name: "HPE Aruba", description: "Networking and edge-to-cloud solutions." },
  ],
  "Red Hat": [
    { name: "Red Hat Enterprise Linux", description: "Enterprise Linux operating system." },
    { name: "Red Hat OpenShift", description: "Kubernetes distribution and container platform." },
    { name: "Red Hat Ansible Automation", description: "Automation platform and Ansible Tower." },
    { name: "Red Hat Virtualization", description: "Open-source virtualization platform." },
  ],
  "Cohesity": [
    { name: "Cohesity SmartData", description: "Data management and protection platform." },
    { name: "Cohesity DataProtect", description: "Backup and recovery solution." },
    { name: "Cohesity DataRecover", description: "Disaster recovery and instant mass restore." },
    { name: "Cohesity FortKnox", description: "Ransomware recovery with immutable backup." },
  ],
  "Veeam": [
    { name: "Veeam Backup & Replication", description: "Backup and replication for virtual, cloud, and physical." },
    { name: "Veeam Agent for Microsoft Windows", description: "Backup agent for Windows workloads." },
    { name: "Veeam Cloud Connect", description: "Service provider backup and disaster recovery." },
    { name: "Veeam ONE", description: "Data center monitoring and optimization." },
  ],
  "Rubrik": [
    { name: "Rubrik Security Cloud", description: "Data security and backup platform." },
    { name: "Rubrik CDM", description: "Cloud data management." },
    { name: "Rubrik Polaris", description: "Data security posture management." },
  ],
  "Commvault": [
    { name: "Commvault Complete Backup & Recovery", description: "Enterprise backup and recovery platform." },
    { name: "Commvault Metallic", description: "SaaS-based backup and recovery." },
    { name: "Commvault HyperProtect", description: "Ransomware protection and immutable storage." },
    { name: "Commvault Cloud Services", description: "Cloud data management and protection." },
  ],
};

// ── TECHNOLOGY ALIASES ──
const aliases = [
  // Palo Alto
  { canonical: "Prisma Cloud", alias: "Prisma", alias_type: "abbreviation" },
  { canonical: "Cortex XDR", alias: "Cortex", alias_type: "abbreviation" },
  { canonical: "Prisma SASE", alias: "Prisma Access", alias_type: "alternative" },
  { canonical: "Cortex XSOAR", alias: "Demisto", alias_type: "historical" },
  // Fortinet
  { canonical: "FortiGate", alias: "Fortigate", alias_type: "common_misspelling" },
  { canonical: "Fortinet Security Fabric", alias: "Security Fabric", alias_type: "alternative" },
  // Cisco
  { canonical: "Cisco Meraki", alias: "Meraki", alias_type: "abbreviation" },
  { canonical: "Cisco SD-WAN", alias: "Viptela", alias_type: "historical" },
  { canonical: "Cisco Umbrella", alias: "OpenDNS", alias_type: "historical" },
  // CrowdStrike
  { canonical: "Falcon Prevent", alias: "Falcon", alias_type: "abbreviation" },
  { canonical: "CrowdStrike Falcon", alias: "Falcon Platform", alias_type: "alternative" },
  // Microsoft
  { canonical: "Microsoft Entra ID", alias: "Azure AD", alias_type: "historical" },
  { canonical: "Microsoft Entra ID", alias: "Entra", alias_type: "abbreviation" },
  { canonical: "Microsoft 365", alias: "M365", alias_type: "abbreviation" },
  // Splunk
  { canonical: "Splunk Enterprise", alias: "Splunk", alias_type: "abbreviation" },
  { canonical: "Splunk SOAR", alias: "Splunk Phantom", alias_type: "historical" },
  // VMware
  { canonical: "VMware vSphere", alias: "ESXi", alias_type: "alternative" },
  { canonical: "VMware Tanzu", alias: "Tanzu", alias_type: "abbreviation" },
  // Red Hat
  { canonical: "Red Hat OpenShift", alias: "OpenShift", alias_type: "abbreviation" },
  { canonical: "Red Hat Enterprise Linux", alias: "RHEL", alias_type: "abbreviation" },
  // Others
  { canonical: "Check Point Infinity", alias: "Infinity", alias_type: "abbreviation" },
  { canonical: "Zscaler Internet Access", alias: "ZIA", alias_type: "abbreviation" },
  { canonical: "Zscaler Private Access", alias: "ZPA", alias_type: "abbreviation" },
  { canonical: "F5 BIG-IP", alias: "BIG-IP", alias_type: "abbreviation" },
];

// ── BUILD SQL ──
let sql = "-- ============================================================\n";
sql += "-- Nujeel Phase 2: Technology Capability Graph — Seed Data\n";
sql += "-- Generated from specification\n";
sql += "-- ============================================================\n\n";
sql += "set client_min_messages to warning;\n\n";

// Domains
sql += "-- ── TECHNOLOGY DOMAINS ──\n";
domains.forEach((d, i) => {
  sql += `INSERT INTO public.technology_domains (id, name, name_ar, description, sort_order) VALUES (gen_random_uuid(), '${d.name}', '${d.name_ar}', '${d.description.replace(/'/g, "''")}', ${i + 1}) ON CONFLICT (name) DO NOTHING;\n`;
});
sql += "\n";

// Categories
sql += "-- ── TECHNOLOGY CATEGORIES ──\n";
let domainIdMap: Record<string, string> = {};
domains.forEach(d => { domainIdMap[d.name] = `'${(domainIdMap[d.name] = 'd' + d.name.replace(/\s/g, '_')).toLowerCase()}'`; });
Object.entries(categories).forEach(([domainName, cats]) => {
  cats.forEach((c, i) => {
    sql += `INSERT INTO public.technology_categories (id, domain_id, name, name_ar, description, sort_order) VALUES (gen_random_uuid(), (SELECT id FROM public.technology_domains WHERE name = '${domainName}'), '${c.name}', '${c.name_ar}', '${c.description.replace(/'/g, "''")}', ${i + 1}) ON CONFLICT (domain_id, name) DO NOTHING;\n`;
  });
});
sql += "\n";

// Vendors
sql += "-- ── VENDORS ──\n";
vendors.forEach((v, i) => {
  sql += `INSERT INTO public.vendors (id, name, description, sort_order) VALUES (gen_random_uuid(), '${v.name}', '${v.description.replace(/'/g, "''")}', ${i + 1}) ON CONFLICT (name) DO NOTHING;\n`;
});
sql += "\n";

// Products
sql += "-- ── PRODUCTS ──\n";
let vendorIdMap: Record<string, string> = {};
let categoryIdMap: Record<string, string> = {};
Object.keys(vendorProducts).forEach(vendorName => {
  vendorIdMap[vendorName] = `(SELECT id FROM public.vendors WHERE name = '${vendorName}')`;
});
Object.entries(categories).forEach(([domainName, cats]) => {
  cats.forEach(c => {
    categoryIdMap[c.name] = `(SELECT id FROM public.technology_categories WHERE name = '${c.name}')`;
  });
});
Object.entries(vendorProducts).forEach(([vendorName, products]) => {
  products.forEach((p, i) => {
    let catClause = "NULL";
    // Try to assign a category based on vendor's likely domain
    const domainMap: Record<string, string> = {
      "Tenable": "Vulnerability Management",
      "Palo Alto Networks": "Cloud Security",
      "Fortinet": "Network Security",
      "CrowdStrike": "Endpoint Security",
      "CyberArk": "Privileged Access",
      "Check Point": "Network Security",
      "F5": "Network Security Services",
      "Imperva": "Network Security Services",
      "Zscaler": "Zero Trust",
      "Netskope": "Zero Trust",
      "Proofpoint": " Email Security",
      "Qualys": "Vulnerability Management",
      "Rapid7": "Vulnerability Management",
      "Splunk": "Security Operations",
      "Nutanix": "Data Center",
      "VMware": "Server Infrastructure",
      "Dell Technologies": "Server Infrastructure",
      "HPE": "Server Infrastructure",
      "Red Hat": "Infrastructure as Code",
      "Cohesity": "Backup Solutions",
      "Veeam": "Backup Solutions",
      "Commvault": "Backup Solutions",
    };
    const catName = domainMap[vendorName] || "Enterprise Networking";
    if (categoryIdMap[catName]) {
      catClause = categoryIdMap[catName];
    }
    sql += `INSERT INTO public.products (id, vendor_id, name, description, category_id, sort_order) VALUES (gen_random_uuid(), ${vendorIdMap[vendorName]}, '${p.name}', '${p.description.replace(/'/g, "''")}', ${catClause}, ${i + 1}) ON CONFLICT (vendor_id, name) DO NOTHING;\n`;
  });
});
sql += "\n";

// Capabilities
sql += "-- ── CAPABILITIES ──\n";
capabilities.forEach((c, i) => {
  sql += `INSERT INTO public.capabilities (id, name, name_ar, description, sort_order) VALUES (gen_random_uuid(), '${c.name}', '${c.name}', '${c.description.replace(/'/g, "''")}', ${i + 1}) ON CONFLICT (name) DO NOTHING;\n`;
});
sql += "\n";

// Product-Capability mappings (assign 3-5 capabilities per product randomly)
sql += "-- ── PRODUCT-CAPABILITY MAPPINGS ──\n";
const allCapNames = capabilities.map(c => c.name);
Object.entries(vendorProducts).forEach(([vendorName, products]) => {
  products.forEach(p => {
    // Deterministic pseudo-random assignment based on product name hash
    let hash = 0;
    for (let ch of p.name) { hash = ((hash << 5) - hash) + ch.charCodeAt(0); hash |= 0; }
    const count = 3 + Math.abs(hash % 3); // 3-5 capabilities
    const used: string[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.abs((hash * (i + 1) * 7 + i * 13) % allCapNames.length);
      const capName = allCapNames[idx];
      if (!used.includes(capName)) {
        used.push(capName);
        const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        const level = levels[Math.abs(hash + i * 3) % levels.length];
        sql += `INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level) VALUES (gen_random_uuid(), (SELECT id FROM public.products WHERE name = '${p.name}' AND vendor_id = (SELECT id FROM public.vendors WHERE name = '${vendorName}')), (SELECT id FROM public.capabilities WHERE name = '${capName}'), '${level}') ON CONFLICT (product_id, capability_id) DO NOTHING;\n`;
      }
    }
  });
});
sql += "\n";

// Aliases
sql += "-- ── TECHNOLOGY ALIASES ──\n";
aliases.forEach(a => {
  sql += `INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type) VALUES (gen_random_uuid(), '${a.canonical}', '${a.alias}', '${a.alias_type}') ON CONFLICT (canonical_name, alias) DO NOTHING;\n`;
});
sql += "\n";

// Write the file
writeFileSync("database/migrations/002_capability_graph_seed.sql", sql);
console.log(`Generated ${sql.split('\n').length} lines of seed SQL → database/migrations/002_capability_graph_seed.sql`);

// Stats
console.log(`Domains: ${domains.length}`);
console.log(`Categories: ${Object.values(categories).flat().length}`);
console.log(`Vendors: ${vendors.length}`);
console.log(`Products: ${Object.values(vendorProducts).flat().length}`);
console.log(`Capabilities: ${capabilities.length}`);
console.log(`Aliases: ${aliases.length}`);
