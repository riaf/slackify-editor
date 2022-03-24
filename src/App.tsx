import { useState } from "react";
import "./App.css";
import Editor from "react-simple-code-editor";
import slackifyMarkdown from "slackify-markdown";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";

function App() {
  const [code, setCode] = useState(
    localStorage.getItem("code") || `# Hello World`
  );
  const markdownText = slackifyMarkdown(code);

  return (
    <div className="App">
      <header className="App-header">
        <p>Slackify Editor</p>
      </header>
      <main className="App-main">
        <div className="App-editor">
          <Editor
            value={code}
            onValueChange={(code) => {
              setCode(code);
              localStorage.setItem("code", code);
            }}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.markdown, "markdown")
            }
            padding={10}
            style={{
              fontFamily:
                'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <aside className="App-preview">
          <pre onClick={() => navigator.clipboard.writeText(markdownText)}>
            {markdownText}
          </pre>
        </aside>
      </main>
    </div>
  );
}

export default App;
