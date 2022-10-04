import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

/**
 * n -> normale
 * -1 -> bomba
 */

/**
 * state
 * 0 -> coperta
 * 1 -> scoperta
 */

function App() {
  const [celle, setCelle] = useState([])
  const [loose, setLoose] = useState(false)

  useEffect(function () {
    const row = 10
    const column = 10
    let mat = new Array(row);
    for (let i = 0; i < row; i++){
      mat[i] = new Array(column);
      for (let j = 0; j < column; j++){
        let type = Math.round(Math.random() * 100);
        type = type < 20 ? -1 : 0;
        mat[i][j] = {value:type, state:0};
      }
    }

    mat[0][0] = 0;
    mat[0][1] = 0;
    mat[0][2] = 0;
    mat[1][0] = 0;
    mat[1][1] = 0;
    mat[1][2] = 0;
    mat[2][0] = 0;
    mat[2][1] = 0;
    mat[2][2] = 0;
    mat[3][0] = 0;
    mat[3][1] = 0;
    mat[3][2] = 0;
    mat[3][3] = 0;
    mat[0][3] = 0;
    mat[1][3] = 0;
    mat[2][3] = 0;

    for (let i = 0; i < row; i++){
      for (let j = 0; j < column; j++){
        if (mat[i][j].value != -1) {
          let bomb_counter = 0;
          let rmin = i == 0 ? 0 : i - 1;
          let rmax = i == row - 1 ? row - 1 : i + 1;
          let cmin = j == 0 ? 0 : j - 1;
          let cmax = j == column - 1 ? column - 1 : j + 1;
          console.log(i, rmin, rmax,'\n',j,cmin,cmax);
          for (let r = rmin; r <= rmax; r++){
            for (let c = cmin; c <= cmax; c++){
              if (mat[r][c].value == -1) {
                bomb_counter++;
              }
            }
          }
          mat[i][j] = {value:bomb_counter, state:0};
        }
        else {
          mat[i][j] = {value:-1, state:0};
        }
        
      }
    }

    mat[0][0].state = 1;
    mat[0][1].state = 1;
    mat[0][2].state = 1;
    mat[1][0].state = 1;
    mat[1][1].state = 1;
    mat[1][2].state = 1;
    mat[2][0].state = 1;
    mat[2][1].state = 1;
    mat[2][2].state = 1;
    mat[3][0].state = 1;
    mat[3][1].state = 1;
    mat[3][2].state = 1;
    mat[3][3].state = 1;
    mat[0][3].state = 1;
    mat[1][3].state = 1;
    mat[2][3].state = 1;
    
    
    setCelle(mat);
  }, [])
  
  
  const onCella = function (id) {
    if(loose)return
    let r = id.split(',')[0]
    let c = id.split(',')[1]

    let tempCelle = [ ...celle ];
    console.log(tempCelle);
    if (tempCelle[r][c].value == -1) {
      alert('hai perso')      
      setLoose(true);
    }
    else {
      tempCelle[r][c].state = 1;
      setCelle(tempCelle)
    }
  }

  return (
    <div className="App" style={{display:'flex', marginTop:'40px'}}>
      <div id='grid' className="grid">
        {
          celle.map((v,i) => 
            <div className='row'>
            {v.map((v2, j) =>
              <Cella id={i + ',' + j} onClick={onCella} state={v2.state} value={v2.value} key={i + ',' + j} loose={loose} />
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}

function Cella({ id, onClick, state, value, loose }) {
  const click = function (e) {
    onClick(id)
  }
  let cssclass = "cella " + (state == 1 ? 'scoperta' : "") + (loose && value == -1 ? 'loose' : "");

  return (
    <div id={id} className={cssclass} onClick={click}>{state == 1 ? value : null}</div>
  )
}

export default App;
