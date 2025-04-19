import React, { useEffect,useRef, useState} from 'react'
import Codemirror from "codemirror";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/mode/javascript/javascript';
import ACTIONS from '../Actions';
import Theme from '../components/Dropdown'

const Editor=({socketRef, roomId, onCodeChange})=> {
  const editorRef = useRef(null);
  const [theme,setTheme] =useState('dracula');
  useEffect(()=>{
    import(`codemirror/theme/${theme}.css`)
      .then(() => {
        console.log(`${theme} theme loaded`);
      })
      .catch((err) => {
        console.error(`Failed to load theme: ${theme}`, err);
      });
    async function init() {
            editorRef.current=Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: theme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            
            editorRef.current.on('change', (instance, changes) =>{
              // console.log('changes'.changes);
              const{origin}=changes;
              const code = instance.getValue();
              onCodeChange(code);
              if(origin!== 'setValue'){
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                  roomId,
                  code,
                });
              }

              // console.log(code);
            });
    }
    init();
  },[theme]);

  useEffect(() => {
    if (socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
            if (code !== null) {
                editorRef.current.setValue(code);
            }
        });
    }

    // return () => {
    //     socketRef.current.off(ACTIONS.CODE_CHANGE);
    // };
}, [socketRef.current]);

const changeTheme = (theme) =>{
  setTheme(theme)
}
return <div>
  <Theme Theme={changeTheme}></Theme>
  <textarea id="realtimeEditor"></textarea>;
  </div>
};

export default Editor