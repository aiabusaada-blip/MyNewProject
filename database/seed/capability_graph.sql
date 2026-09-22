-- Nujeel Phase 2 Seed Data: Technology Capability Graph

-- DOMAINS
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Cybersecurity', 'الأمن السيبراني', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Infrastructure', 'البنية التحتية', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Cloud', 'السحابة', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Networking', 'الشبكات', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Backup & Data Protection', 'النسخ الاحتيائي وحماية البيانات', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'DevOps', 'تطوير العمليات', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Kubernetes', 'كيبرنتيس', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Artificial Intelligence', 'الذكاء الاصطناعي', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Data & Analytics', 'البيانات والتحليلات', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Observability', 'المراقبة', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Identity & Access Management', 'إدارة الهوية والوصول', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Digital Transformation', 'التحول الرقمي', 0);
INSERT INTO public.technology_domains (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Consulting Services', 'خدمات الاستشارة', 0);

-- CATEGORIES
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Vulnerability Management', 'إدارة الثغرات', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Network Security', 'أمان الشبكات', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Endpoint Security', 'أمان النقاط الطرفية', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Identity Security', 'أمان الهوية', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cloud Security', 'أمان السحابة', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Application Security', 'أمان التطبيقات', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Data Security', 'أمان البيانات', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Security Operations', 'عمليات الأمان', 0 FROM public.technology_domains WHERE name = 'Cybersecurity';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Compute', 'الحوسبة', 0 FROM public.technology_domains WHERE name = 'Infrastructure';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Storage', 'التخزين', 0 FROM public.technology_domains WHERE name = 'Infrastructure';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Virtualization', 'التخمينية', 0 FROM public.technology_domains WHERE name = 'Infrastructure';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Hardware', 'الأجهزة', 0 FROM public.technology_domains WHERE name = 'Infrastructure';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'IaaS', 'البنية التحتية كخدمة', 0 FROM public.technology_domains WHERE name = 'Cloud';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'PaaS', 'المنصة كخدمة', 0 FROM public.technology_domains WHERE name = 'Cloud';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'SaaS', 'البرمجيات كخدمة', 0 FROM public.technology_domains WHERE name = 'Cloud';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cloud Migration', 'هجرة السحابة', 0 FROM public.technology_domains WHERE name = 'Cloud';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Load Balancing', 'توازن الحمل', 0 FROM public.technology_domains WHERE name = 'Networking';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'DNS', 'نظام أسماء النطاقات', 0 FROM public.technology_domains WHERE name = 'Networking';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'SD-WAN', 'شبكة WAN المعرفة بالبرمجيات', 0 FROM public.technology_domains WHERE name = 'Networking';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Firewalls', 'جدران الحماية', 0 FROM public.technology_domains WHERE name = 'Networking';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Backup', 'النسخ الاحتيائي', 0 FROM public.technology_domains WHERE name = 'Backup & Data Protection';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Disaster Recovery', 'استعادة الكوارث', 0 FROM public.technology_domains WHERE name = 'Backup & Data Protection';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Data Archiving', 'أرشفة البيانات', 0 FROM public.technology_domains WHERE name = 'Backup & Data Protection';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Data Governance', 'حوكمة البيانات', 0 FROM public.technology_domains WHERE name = 'Backup & Data Protection';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'CI/CD', 'التكامل والنشر المستمرين', 0 FROM public.technology_domains WHERE name = 'DevOps';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Infrastructure as Code', 'البنية التحتية ككود', 0 FROM public.technology_domains WHERE name = 'DevOps';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Monitoring', 'المراقبة', 0 FROM public.technology_domains WHERE name = 'DevOps';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Automation', 'الأتمتة', 0 FROM public.technology_domains WHERE name = 'DevOps';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Orchestration', 'التنسيق', 0 FROM public.technology_domains WHERE name = 'Kubernetes';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Service Mesh', 'شبكة الخدمات', 0 FROM public.technology_domains WHERE name = 'Kubernetes';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Container Management', 'إدارة الحاويات', 0 FROM public.technology_domains WHERE name = 'Kubernetes';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Machine Learning', 'التعلم الآلي', 0 FROM public.technology_domains WHERE name = 'Artificial Intelligence';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Natural Language Processing', 'معالجة اللغة الطبيعية', 0 FROM public.technology_domains WHERE name = 'Artificial Intelligence';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Computer Vision', 'رؤية الكمبيوتر', 0 FROM public.technology_domains WHERE name = 'Artificial Intelligence';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'AI Platforms', 'منصات الذكاء الاصطناعي', 0 FROM public.technology_domains WHERE name = 'Artificial Intelligence';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Data Warehousing', 'مستودع البيانات', 0 FROM public.technology_domains WHERE name = 'Data & Analytics';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Business Intelligence', 'الذكاء التجاري', 0 FROM public.technology_domains WHERE name = 'Data & Analytics';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'ETL', 'استخراج وتحويل وتحميل', 0 FROM public.technology_domains WHERE name = 'Data & Analytics';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Data Engineering', 'هندسة البيانات', 0 FROM public.technology_domains WHERE name = 'Data & Analytics';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Logging', 'التسجيل', 0 FROM public.technology_domains WHERE name = 'Observability';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Metrics', 'المقاييس', 0 FROM public.technology_domains WHERE name = 'Observability';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Tracing', 'التتبع', 0 FROM public.technology_domains WHERE name = 'Observability';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Alerting', 'التنبيه', 0 FROM public.technology_domains WHERE name = 'Observability';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'SSO', 'تسجيل الدخول الموحد', 0 FROM public.technology_domains WHERE name = 'Identity & Access Management';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'MFA', 'المصادقة متعددة العوامل', 0 FROM public.technology_domains WHERE name = 'Identity & Access Management';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'PAM', 'إدارة الامتيازات', 0 FROM public.technology_domains WHERE name = 'Identity & Access Management';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'IAM', 'إدارة الهوية والوصول', 0 FROM public.technology_domains WHERE name = 'Identity & Access Management';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Strategy', 'الاستراتيجية', 0 FROM public.technology_domains WHERE name = 'Digital Transformation';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Implementation', 'التنفيذ', 0 FROM public.technology_domains WHERE name = 'Digital Transformation';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Change Management', 'إدارة التغيير', 0 FROM public.technology_domains WHERE name = 'Digital Transformation';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Architecture', 'الهندسة المعمارية', 0 FROM public.technology_domains WHERE name = 'Consulting Services';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Assessment', 'التقييم', 0 FROM public.technology_domains WHERE name = 'Consulting Services';
INSERT INTO public.technology_categories (id, domain_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Strategy', 'الاستراتيجية', 0 FROM public.technology_domains WHERE name = 'Consulting Services';

-- VENDORS
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Tenable', 'تenable', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Palo Alto Networks', 'باندو ألتو نيتووركس', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Fortinet', 'فورتي نت', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'CrowdStrike', 'كراود ستريك', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'CyberArk', 'سايبرارك', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Microsoft', 'مايكروسوفت', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Cisco', 'سيسكو', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Check Point', 'تشيك بوينت', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'F5', 'F5', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Imperva', 'إيمبريفا', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Zscaler', 'زسكاليذر', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Netskope', 'نتسكوب', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Proofpoint', 'بروف بوينت', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Qualys', 'كواليس', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Rapid7', 'رابيد 7', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Splunk', 'سبلك', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Nutanix', 'نوتانكس', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'VMware', 'VMware', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Dell Technologies', 'ديل تكنولوجيز', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'HPE', 'HPE', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Red Hat', 'ريد هات', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Cohesity', 'كوهيستيتي', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Veeam', 'فيام', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Rubrik', 'روبريك', 0);
INSERT INTO public.vendors (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Commvault', 'كومفولت', 0);

-- PRODUCTS
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Tenable Security Center', 'مركز تenable الأمني', 0 FROM public.vendors WHERE name = 'Tenable';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Tenable Vulnerability Management', 'إدارة الثغرات تenable', 0 FROM public.vendors WHERE name = 'Tenable';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Tenable OT', 'تenable OT', 0 FROM public.vendors WHERE name = 'Tenable';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Nessus', 'Nessus', 0 FROM public.vendors WHERE name = 'Tenable';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Tenable.cs', 'Tenable.cs', 0 FROM public.vendors WHERE name = 'Tenable';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Prisma Access', 'Prisma Access', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cortex XDR', 'Cortex XDR', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cortex XSIAM', 'Cortex XSIAM', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'PAN-OS', 'PAN-OS', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Prisma Cloud', 'Prisma Cloud', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Prisma SASE', 'Prisma SASE', 0 FROM public.vendors WHERE name = 'Palo Alto Networks';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiGate', 'FortiGate', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiAnalyzer', 'FortiAnalyzer', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiSIEM', 'FortiSIEM', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiManager', 'FortiManager', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiNDR', 'FortiNDR', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'FortiSandbox', 'FortiSandbox', 0 FROM public.vendors WHERE name = 'Fortinet';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Falcon Platform', 'منصة Falcon', 0 FROM public.vendors WHERE name = 'CrowdStrike';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Falcon Insight', 'Falcon Insight', 0 FROM public.vendors WHERE name = 'CrowdStrike';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Falcon Prevent', 'Falcon Prevent', 0 FROM public.vendors WHERE name = 'CrowdStrike';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Falcon Cloud Security', 'Falcon Cloud Security', 0 FROM public.vendors WHERE name = 'CrowdStrike';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Falcon Identity Protection', 'Falcon Identity Protection', 0 FROM public.vendors WHERE name = 'CrowdStrike';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'CyberArk Privileged Access Security', 'CyberArk Privileged Access Security', 0 FROM public.vendors WHERE name = 'CyberArk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'CyberArk Identity', 'CyberArk Identity', 0 FROM public.vendors WHERE name = 'CyberArk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'CyberArk Endpoint Privilege Manager', 'CyberArk Endpoint Privilege Manager', 0 FROM public.vendors WHERE name = 'CyberArk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'CyberArk Conductor', 'CyberArk Conductor', 0 FROM public.vendors WHERE name = 'CyberArk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Entra ID', 'Microsoft Entra ID', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Defender for Endpoint', 'Microsoft Defender for Endpoint', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Sentinel', 'Microsoft Sentinel', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Intune', 'Microsoft Intune', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Purview', 'Microsoft Purview', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Microsoft Azure', 'Microsoft Azure', 0 FROM public.vendors WHERE name = 'Microsoft';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cisco SecureX', 'Cisco SecureX', 0 FROM public.vendors WHERE name = 'Cisco';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cisco Umbrella', 'Cisco Umbrella', 0 FROM public.vendors WHERE name = 'Cisco';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cisco Firepower', 'Cisco Firepower', 0 FROM public.vendors WHERE name = 'Cisco';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cisco Meraki', 'Cisco Meraki', 0 FROM public.vendors WHERE name = 'Cisco';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cisco XDR', 'Cisco XDR', 0 FROM public.vendors WHERE name = 'Cisco';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Check Point Quantum', 'Check Point Quantum', 0 FROM public.vendors WHERE name = 'Check Point';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Check Point Harmony', 'Check Point Harmony', 0 FROM public.vendors WHERE name = 'Check Point';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Check Point Infinity', 'Check Point Infinity', 0 FROM public.vendors WHERE name = 'Check Point';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Check Point CloudGuard', 'Check Point CloudGuard', 0 FROM public.vendors WHERE name = 'Check Point';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'BIG-IP', 'BIG-IP', 0 FROM public.vendors WHERE name = 'F5';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Distributed Cloud Services', 'Distributed Cloud Services', 0 FROM public.vendors WHERE name = 'F5';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'F5 Distributed Cloud ADC', 'F5 Distributed Cloud ADC', 0 FROM public.vendors WHERE name = 'F5';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Imperva WAF', 'Imperva WAF', 0 FROM public.vendors WHERE name = 'Imperva';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Imperva DDoS Protection', 'Imperva DDoS Protection', 0 FROM public.vendors WHERE name = 'Imperva';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Imperva Database Security', 'Imperva Database Security', 0 FROM public.vendors WHERE name = 'Imperva';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Incapsula', 'Incapsula', 0 FROM public.vendors WHERE name = 'Imperva';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Zscaler Internet Access', 'Zscaler Internet Access', 0 FROM public.vendors WHERE name = 'Zscaler';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Zscaler Private Access', 'Zscaler Private Access', 0 FROM public.vendors WHERE name = 'Zscaler';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Zscaler Digital Experience', 'Zscaler Digital Experience', 0 FROM public.vendors WHERE name = 'Zscaler';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Netskope Security Cloud', 'Netskope Security Cloud', 0 FROM public.vendors WHERE name = 'Netskope';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Netskope CASB', 'Netskope CASB', 0 FROM public.vendors WHERE name = 'Netskope';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Netskope SWG', 'Netskope SWG', 0 FROM public.vendors WHERE name = 'Netskope';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Proofpoint Email Protection', 'Proofpoint Email Protection', 0 FROM public.vendors WHERE name = 'Proofpoint';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Proofpoint Targeted Attack Protection', 'Proofpoint Targeted Attack Protection', 0 FROM public.vendors WHERE name = 'Proofpoint';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Proofpoint Nexus', 'Proofpoint Nexus', 0 FROM public.vendors WHERE name = 'Proofpoint';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Qualys Cloud Platform', 'Qualys Cloud Platform', 0 FROM public.vendors WHERE name = 'Qualys';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Qualys VMDR', 'Qualys VMDR', 0 FROM public.vendors WHERE name = 'Qualys';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Qualys Policy Compliance', 'Qualys Policy Compliance', 0 FROM public.vendors WHERE name = 'Qualys';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rapid7 InsightVM', 'Rapid7 InsightVM', 0 FROM public.vendors WHERE name = 'Rapid7';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rapid7 InsightConnect', 'Rapid7 InsightConnect', 0 FROM public.vendors WHERE name = 'Rapid7';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rapid7 InsightIDR', 'Rapid7 InsightIDR', 0 FROM public.vendors WHERE name = 'Rapid7';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rapid7 Command', 'Rapid7 Command', 0 FROM public.vendors WHERE name = 'Rapid7';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Splunk Enterprise', 'Splunk Enterprise', 0 FROM public.vendors WHERE name = 'Splunk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Splunk Cloud Platform', 'Splunk Cloud Platform', 0 FROM public.vendors WHERE name = 'Splunk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Splunk SOAR', 'Splunk SOAR', 0 FROM public.vendors WHERE name = 'Splunk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Splunk ITSI', 'Splunk ITSI', 0 FROM public.vendors WHERE name = 'Splunk';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Nutanix AHV', 'Nutanix AHV', 0 FROM public.vendors WHERE name = 'Nutanix';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Nutanix Prism', 'Nutanix Prism', 0 FROM public.vendors WHERE name = 'Nutanix';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Nutanix Calm', 'Nutanix Calm', 0 FROM public.vendors WHERE name = 'Nutanix';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Nutanix Frame', 'Nutanix Frame', 0 FROM public.vendors WHERE name = 'Nutanix';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'VMware vSphere', 'VMware vSphere', 0 FROM public.vendors WHERE name = 'VMware';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'VMware vSAN', 'VMware vSAN', 0 FROM public.vendors WHERE name = 'VMware';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'VMware NSX', 'VMware NSX', 0 FROM public.vendors WHERE name = 'VMware';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'VMware Cloud Foundation', 'VMware Cloud Foundation', 0 FROM public.vendors WHERE name = 'VMware';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'VMware Tanzu', 'VMware Tanzu', 0 FROM public.vendors WHERE name = 'VMware';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Dell PowerEdge', 'Dell PowerEdge', 0 FROM public.vendors WHERE name = 'Dell Technologies';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Dell PowerStore', 'Dell PowerStore', 0 FROM public.vendors WHERE name = 'Dell Technologies';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Dell EMC VMAX', 'Dell EMC VMAX', 0 FROM public.vendors WHERE name = 'Dell Technologies';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Dell APEX', 'Dell APEX', 0 FROM public.vendors WHERE name = 'Dell Technologies';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'HPE ProLiant', 'HPE ProLiant', 0 FROM public.vendors WHERE name = 'HPE';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'HPE GreenLake', 'HPE GreenLake', 0 FROM public.vendors WHERE name = 'HPE';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'HPE Synergy', 'HPE Synergy', 0 FROM public.vendors WHERE name = 'HPE';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'HPE Alletra', 'HPE Alletra', 0 FROM public.vendors WHERE name = 'HPE';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Red Hat Enterprise Linux', 'Red Hat Enterprise Linux', 0 FROM public.vendors WHERE name = 'Red Hat';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Red Hat OpenShift', 'Red Hat OpenShift', 0 FROM public.vendors WHERE name = 'Red Hat';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Red Hat Ansible', 'Red Hat Ansible', 0 FROM public.vendors WHERE name = 'Red Hat';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Red Hat Virtualization', 'Red Hat Virtualization', 0 FROM public.vendors WHERE name = 'Red Hat';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Red Hat Insights', 'Red Hat Insights', 0 FROM public.vendors WHERE name = 'Red Hat';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cohesity DataPlatform', 'Cohesity DataPlatform', 0 FROM public.vendors WHERE name = 'Cohesity';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cohesity Helios', 'Cohesity Helios', 0 FROM public.vendors WHERE name = 'Cohesity';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Cohesity CyberSense', 'Cohesity CyberSense', 0 FROM public.vendors WHERE name = 'Cohesity';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Veeam Backup & Replication', 'Veeam Backup & Replication', 0 FROM public.vendors WHERE name = 'Veeam';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Veeam Backup for Microsoft 365', 'Veeam Backup for Microsoft 365', 0 FROM public.vendors WHERE name = 'Veeam';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Veeam Availability Suite', 'Veeam Availability Suite', 0 FROM public.vendors WHERE name = 'Veeam';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Veeam Data Platform', 'Veeam Data Platform', 0 FROM public.vendors WHERE name = 'Veeam';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rubrik Polaris', 'Rubrik Polaris', 0 FROM public.vendors WHERE name = 'Rubrik';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rubrik Security Cloud', 'Rubrik Security Cloud', 0 FROM public.vendors WHERE name = 'Rubrik';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Rubrik CDM', 'Rubrik CDM', 0 FROM public.vendors WHERE name = 'Rubrik';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Commvault Complete Backup', 'Commvault Complete Backup', 0 FROM public.vendors WHERE name = '('Commvault', 'كومفولت')';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Commvault HyperScale', 'Commvault HyperScale', 0 FROM public.vendors WHERE name = '('Commvault', 'كومفولت')';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Commvault Metallic', 'Commvault Metallic', 0 FROM public.vendors WHERE name = '('Commvault', 'كومفولت')';
INSERT INTO public.products (id, vendor_id, name, name_ar, sort_order)
  SELECT gen_random_uuid(), id, 'Commvault Data Protection', 'Commvault Data Protection', 0 FROM public.vendors WHERE name = '('Commvault', 'كومفولت')';

-- CAPABILITIES
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Architecture', 'Architecture', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Assessment', 'Assessment', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Design', 'Design', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Installation', 'Installation', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Implementation', 'Implementation', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Configuration', 'Configuration', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Integration', 'Integration', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Migration', 'Migration', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Upgrade', 'Upgrade', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Troubleshooting', 'Troubleshooting', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Administration', 'Administration', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Operations', 'Operations', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Optimization', 'Optimization', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Health Check', 'Health Check', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Consulting', 'Consulting', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Professional Services', 'Professional Services', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Presales', 'Presales', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Training', 'Training', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Support', 'Support', 0);
INSERT INTO public.capabilities (id, name, name_ar, sort_order) VALUES (gen_random_uuid(), 'Project Leadership', 'Project Leadership', 0);

-- PRODUCT CAPABILITIES
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Integration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Migration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Security Center' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Vulnerability Management' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Vulnerability Management' AND c.name = 'Assessment';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Vulnerability Management' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable Vulnerability Management' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable OT' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable OT' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable OT' AND c.name = 'Assessment';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Tenable OT' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nessus' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nessus' AND c.name = 'Assessment';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nessus' AND c.name = 'Scanning';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Prisma Access' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Prisma Access' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Prisma Access' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Prisma Access' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Prisma Access' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cortex XDR' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cortex XDR' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cortex XDR' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cortex XDR' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cortex XDR' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Configuration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Migration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiGate' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiSIEM' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiSIEM' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiSIEM' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'FortiSIEM' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Falcon Platform' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Falcon Platform' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Falcon Platform' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Falcon Platform' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Falcon Platform' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'CyberArk Privileged Access Security' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'CyberArk Privileged Access Security' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'CyberArk Privileged Access Security' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'CyberArk Privileged Access Security' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Sentinel' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Sentinel' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Sentinel' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Sentinel' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Sentinel' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Entra ID' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Entra ID' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Entra ID' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Entra ID' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Microsoft Entra ID' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco SecureX' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco SecureX' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco SecureX' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco SecureX' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco Umbrella' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco Umbrella' AND c.name = 'Configuration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco Umbrella' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Cisco Umbrella' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Check Point Quantum' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Check Point Quantum' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Check Point Quantum' AND c.name = 'Configuration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Check Point Quantum' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Check Point Quantum' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Configuration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'BIG-IP' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Qualys Cloud Platform' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Qualys Cloud Platform' AND c.name = 'Assessment';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Qualys Cloud Platform' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Qualys Cloud Platform' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Rapid7 InsightVM' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Rapid7 InsightVM' AND c.name = 'Assessment';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Rapid7 InsightVM' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Rapid7 InsightVM' AND c.name = 'Support';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Rapid7 InsightVM' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Splunk Enterprise' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Splunk Enterprise' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Splunk Enterprise' AND c.name = 'Optimization';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Splunk Enterprise' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Splunk Enterprise' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nutanix AHV' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nutanix AHV' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nutanix AHV' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nutanix AHV' AND c.name = 'Migration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Nutanix AHV' AND c.name = 'Consulting';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Red Hat OpenShift' AND c.name = 'Architecture';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Red Hat OpenShift' AND c.name = 'Implementation';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Red Hat OpenShift' AND c.name = 'Administration';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Red Hat OpenShift' AND c.name = 'Operations';
INSERT INTO public.product_capabilities (id, product_id, capability_id, proficiency_level)
  SELECT gen_random_uuid(), p.id, c.id, 'Expert'
  FROM public.products p, public.capabilities c
  WHERE p.name = 'Red Hat OpenShift' AND c.name = 'Consulting';

-- ALIASES
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Tenable.sc', 'abbreviation'
  FROM public.products p WHERE p.name = 'Tenable Security Center';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'SecurityCenter', 'abbreviation'
  FROM public.products p WHERE p.name = 'Tenable Security Center';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Tenable SC', 'common_misspelling'
  FROM public.products p WHERE p.name = 'Tenable Security Center';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Tenable VM', 'abbreviation'
  FROM public.products p WHERE p.name = 'Tenable Vulnerability Management';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Tenable Vulnerability Management', 'historical'
  FROM public.products p WHERE p.name = 'Tenable Vulnerability Management';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Nessus Professional', 'alternative'
  FROM public.products p WHERE p.name = 'Nessus';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Prisma Access Cloud', 'alternative'
  FROM public.products p WHERE p.name = 'Prisma Access';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Cortex XDR Platform', 'alternative'
  FROM public.products p WHERE p.name = 'Cortex XDR';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'FortiGate Firewall', 'alternative'
  FROM public.products p WHERE p.name = 'FortiGate';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'CrowdStrike Falcon', 'alternative'
  FROM public.products p WHERE p.name = 'Falcon Platform';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Azure Sentinel', 'historical'
  FROM public.products p WHERE p.name = 'Microsoft Sentinel';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Azure AD', 'historical'
  FROM public.products p WHERE p.name = 'Microsoft Entra ID';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Azure Intune', 'historical'
  FROM public.products p WHERE p.name = 'Microsoft Intune';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'Cisco SecureX Platform', 'alternative'
  FROM public.products p WHERE p.name = 'Cisco SecureX';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'F5 BIG-IP', 'alternative'
  FROM public.products p WHERE p.name = 'BIG-IP';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'F5 BIG-IP LTM', 'alternative'
  FROM public.products p WHERE p.name = 'BIG-IP';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'OKD', 'alternative'
  FROM public.products p WHERE p.name = 'Red Hat OpenShift';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'AHV', 'abbreviation'
  FROM public.products p WHERE p.name = 'Nutanix AHV';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'vSphere', 'abbreviation'
  FROM public.products p WHERE p.name = 'VMware vSphere';
INSERT INTO public.technology_aliases (id, canonical_name, alias, alias_type)
  SELECT gen_random_uuid(), p.id, 'vSAN', 'abbreviation'
  FROM public.products p WHERE p.name = 'VMware vSAN';

