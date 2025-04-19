import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const codemirrorThemes = [
  '3024-day', '3024-night', 'abbott', 'abcdef', 'ayu-dark', 'ayu-mirage', 'base16-dark', 'base16-light',
  'bespin', 'blackboard', 'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'duotone-light',
  'eclipse', 'elegant', 'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder', 'idea', 'isotope', 'juejin',
  'lesser-dark', 'liquibyte', 'lucario', 'material', 'material-darker', 'material-palenight', 'material-ocean',
  'mbo', 'mdn-like', 'midnight', 'monokai', 'moxer', 'neat', 'neo', 'night', 'nord', 'oceanic-next',
  'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti',
  'shadowfox', 'solarized', 'ssms', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn',
  'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'yonce', 'zenburn'
];

function SplitBasicExample({Theme}) {
    const [themeVar,setTheme] = useState("SelectTheme");

    function changeTheme(theme){
        setTheme(theme);
        Theme(theme);
    }
  return (
    <div className="ThemeClass" >
    <div > 
    <Dropdown as={ButtonGroup} >
      <Button variant="success">{themeVar}</Button>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {codemirrorThemes.map((theme) => (
          <Dropdown.Item key={theme} onClick={(e) => changeTheme(theme)} >
            {theme}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </div>
    </div>
  );
}

export default SplitBasicExample;
