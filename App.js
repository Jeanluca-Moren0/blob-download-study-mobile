import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { api } from './api';
import * as FileSystem from 'expo-file-system';


export default function App() {
  const [id, setId] = useState('');
  const [pdfBlob, setPdfBlob] = useState('');

  const jsCode = `
        alert('start')
        const buttonContainer = document.getElementsByClassName('wrapper');
        let idRequest;
      
        for(let i = 0; i <= buttonContainer.length; i++){

          let idText = buttonContainer[i].children[0].innerText;

          const ids =  idText.replace('Id do arquivo: ', '')
          
          let buttons = buttonContainer[i].children[1];
          
          buttons.onclick = () => {window.ReactNativeWebView.postMessage(ids)}; 
        }
  `;

  const getPdfFile = async (id) => {
    try {
      const response = await api.get(`/pdf/${id}`, {
        responseType: 'arraybuffer',
      });

      setPdfBlob(response.request._response);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDowloadAndroid = async () => {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      const fileName = 'PDF123';
      const fileURI = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/pdf'
      );

      await FileSystem.writeAsStringAsync(fileURI, pdfBlob, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WebView
      forceDarkOn
      incognito
      style={{ flex: 1 }}
      originWhitelist={['*']}
      source={{ uri: 'https://blob-download-study-frontend.vercel.app/' }}
      onMessage={(event) => {
        setId(event.nativeEvent.data);
        getPdfFile(1);
        handleDowloadAndroid();
      }}
      javaScriptEnabledAndroid={true}
      injectedJavaScript={jsCode}
    />
  );
}
