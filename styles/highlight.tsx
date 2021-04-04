import Highlight from 'react-highlight';
import '../../node_modules/highlight.js/styles/nord.css';

interface CodeBlockProps {
  value: any;
}

const CodeBlock: NextPage<CodeBlockProps> = ({ value }) => {
  return (
    <div>
      <Highlight>
        {value}
      </Highlight>
      <br />
    </div>
  )
}
