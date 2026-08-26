import os
import re

html_path = r"public\quantumarena\index.html"
tsx_path = r"components\productpages\QuantumArena.tsx"

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract from <div class="loader" id="loader"> to the end of <footer> (and modal)
body_match = re.search(r'<div class="loader" id="loader">.*?<div class="modal"[^>]*>.*?</div>\s*</div>', html_content, re.DOTALL)
if body_match:
    body_html = body_match.group(0)
    
    # Convert HTML to JSX
    jsx_content = body_html.replace('class=', 'className=')
    jsx_content = jsx_content.replace('for=', 'htmlFor=')
    jsx_content = jsx_content.replace('tabindex=', 'tabIndex=')
    jsx_content = jsx_content.replace('aria-hidden=', 'aria-hidden=') # fine as is
    
    # Convert inline styles (very basic, specifically the ones in this file)
    jsx_content = re.sub(r'style="margin-top:\s*42px"', 'style={{marginTop:"42px"}}', jsx_content)
    jsx_content = re.sub(r'style="margin-top:\s*50px.*?gap:\s*14px;"', 'style={{marginTop: "50px", display: "flex", flexDirection: "column", gap: "14px"}}', jsx_content)
    jsx_content = re.sub(r'style="padding:\s*16px 20px.*?border-radius:\s*4px;"', 'style={{padding: "16px 20px", border: "1px solid rgba(255, 37, 56, 0.15)", background: "rgba(255, 37, 56, 0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "4px"}}', jsx_content)
    # The tech stack styles:
    jsx_content = re.sub(r'style="font: 800 12px Orbitron.*?0.05em;"', 'style={{font: "800 12px Orbitron", color: "#fff", letterSpacing: "0.05em"}}', jsx_content)
    jsx_content = re.sub(r'style="font: 600 10px \'JetBrains Mono\'.*?red\);"|style="font: 600 10px &#39;JetBrains Mono&#39;.*?red\);"', 'style={{font: "600 10px \'JetBrains Mono\'", color: "var(--red)"}}', jsx_content)
    
    jsx_content = re.sub(r'style="background:#ff3c50;width:7px;height:7px;border-radius:50%"', 'style={{background:"#ff3c50",width:"7px",height:"7px",borderRadius:"50%"}}', jsx_content)
    jsx_content = re.sub(r'style="background:#ffc43d;width:7px;height:7px;border-radius:50%"', 'style={{background:"#ffc43d",width:"7px",height:"7px",borderRadius:"50%"}}', jsx_content)
    jsx_content = re.sub(r'style="background:#20d998;width:7px;height:7px;border-radius:50%"', 'style={{background:"#20d998",width:"7px",height:"7px",borderRadius:"50%"}}', jsx_content)
    jsx_content = re.sub(r'style="color:#5f6b75"', 'style={{color:"#5f6b75"}}', jsx_content)
    
    # self-closing tags
    jsx_content = re.sub(r'<img([^>]*)>', r'<img\1 />', jsx_content)
    jsx_content = re.sub(r'<br>', r'<br />', jsx_content)
    jsx_content = jsx_content.replace('<img />', '<img>') # fix empty
    jsx_content = jsx_content.replace('// />', '//>') # fix mess

    # Write into TSX
    with open(tsx_path, 'r', encoding='utf-8') as f:
        tsx_content = f.read()
    
    # Replace everything in the return statement
    tsx_replaced = re.sub(r'return \(\s*<div className="quantum-page" ref=\{containerRef\}>.*', 'return (\n    <div className="quantum-page" ref={containerRef}>\n      ' + jsx_content + '\n    </div>\n  );\n}\n', tsx_content, flags=re.DOTALL)
    
    with open(tsx_path, 'w', encoding='utf-8') as f:
        f.write(tsx_replaced)
    
    print("SUCCESS")
else:
    print("NO MATCH")
