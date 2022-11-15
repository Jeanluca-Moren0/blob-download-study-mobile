
import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  const jsCode = `
      function downloadFile(obj){
        alert("hello")
        const buttonContainer = document.getElementsByClassName('wrapper');
        buttonContainer[0].children[1].onclick = function(){alert('hello')}
      }

      downloadFile()

  `;
  return (
    <WebView
      style={{ flex: 1 }}
      originWhitelist={['*']}
      source={{ uri: 'https://blob-download-study-frontend.vercel.app/' }}
      forceDarkOn
      incognito
      javaScriptEnabledAndroid={true}
      injectedJavaScript={jsCode}
    />
  );
}
