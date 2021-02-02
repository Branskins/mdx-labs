import React, { Component } from 'react'

// It requires and returns all modules that match
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

// It contains references to all modules in that ./content directory
const mdxContextModule = requireAll(
  require.context(
    '!babel-loader!@mdx-js/loader!./content',
    false,
    /^\.\/.*\.mdx$/
  )
);

// It extracts the MDX component
const mdxComponents = mdxContextModule.map((mdx, index) => {
  return { key: index, component: mdx.default }
})

function Item(props) {
  const MdxComponent = props.component;
  return <div><MdxComponent /></div>;
}

class App extends Component {
  render() {
    return (
      <div>
        <p>This was created with MDX</p>
        { mdxComponents.map((mdx) => <Item key={mdx.key} component={mdx.component} />)}
      </div>
    )
  }
}

export default App;
