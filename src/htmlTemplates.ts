export function generateHTMLTemplate(snapshotContent: string[], headings: string[]) {
    
    const createContentsHTML = headings.map(heading => {
        return `<li><a href="#${heading.replaceAll(" ", "_")}">${heading}</a></li>\n`;
    });
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Snapshot Preview</title>
    <style>
        body {
            background: #f8f9fa;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: black;
        }
        .container {
            width: 100%;
            max-width: 1020px;
            margin: 32px auto 0 auto;
            padding: 0 16px 32px 16px;
            box-sizing: border-box;
        }
        .contents {
            background: #fff;
            border: 2px solid #007bff;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 32px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .contents ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        .contents li {
            margin-bottom: 8px;
        }
        .contents a {
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
        }
        .contents a:hover {
            text-decoration: underline;
        }
        .snapshot-output {
            border: 2px solid #007bff;
            border-radius: 8px;
            background: #fff;
            padding: 16px;
            margin-bottom: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            word-break: break-word;
        }
        .test-name {
            margin-top: 0;
            color: #007bff;
        }

        .test-heading {
            color: #007bff;
        }
        pre {
            display: block;
            background: #f4f6fa;
            color: #222;
            font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
            font-size: 1em;
            padding: 12px;
            border-radius: 6px;
            margin-top: 8px;
            white-space: pre-wrap;
            overflow-x: auto;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <div class="contents">
            <h2 class="test-heading">Test Snapshots</h2>
            ${createContentsHTML.join("")}
        </div>
            ${snapshotContent.join("\n\n")}
    </div>
</body>
<script>
function scrollTop() {
    window.scrollTo(0,0)
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scrollTop);
} else {
    scrollTop();
}
document.addEventListener('DOMContentLoaded', scrollTop);
</script>
</html>
`;}