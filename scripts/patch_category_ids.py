#!/usr/bin/env python3
"""Add category_id to each product in seed-data.ts based on vendor mapping."""

import re

with open("lib/graph/seed-data.ts", "r") as f:
    content = f.read()

# Category mapping per vendor
cat_map = {
    "v1": "c1",   # Tenable → Vulnerability Management
    "v2": "c4",   # Palo Alto Networks → Cloud Security
    "v3": "c3",   # Fortinet → Network Security
    "v4": "c2",   # CrowdStrike → Endpoint Security
    "v5": "c39",  # CyberArk → Privileged Access
    "v6": "c17",  # Cisco → Network Security Services
    "v7": "c3",   # Check Point → Network Security
    "v8": "c17",  # F5 → Network Security Services
    "v9": "c17",  # Imperva → Network Security Services
    "v10": "c7",  # Zscaler → Zero Trust
    "v11": "c7",  # Netskope → Zero Trust
    "v12": "c6",  # Proofpoint → Email Security
    "v13": "c1",  # Qualys → Vulnerability Management
    "v14": "c1",  # Rapid7 → Vulnerability Management
    "v15": "c8",  # Splunk → Security Operations
    "v16": "c11", # Nutanix → Data Center
    "v17": "c9",  # VMware → Server Infrastructure
    "v18": "c9",  # Dell Technologies → Server Infrastructure
    "v19": "c9",  # HPE → Server Infrastructure
    "v20": "c23", # Red Hat → Infrastructure as Code
    "v21": "c19", # Cohesity → Backup Solutions
    "v22": "c19", # Veeam → Backup Solutions
    "v23": "c19", # Rubrik → Backup Solutions
    "v24": "c19", # Commvault → Backup Solutions
    "v25": "c19", # Commvault → Backup Solutions
}

patched = 0
for vid, cid in cat_map.items():
    # Pattern: { id: "pX", vendor_id: "vN", name: "..."
    old = f'vendor_id: "{vid}", name:'
    new = f'vendor_id: "{vid}", category_id: "{cid}", name:'
    content = content.replace(old, new)
    if old in content:
        patched += 1

with open("lib/graph/seed-data.ts", "w") as f:
    f.write(content)

print(f"Patched {patched} vendor groups")
