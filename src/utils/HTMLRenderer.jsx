function HTMLRenderer({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default HTMLRenderer;
