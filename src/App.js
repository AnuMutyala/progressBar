import React, {Component} from 'react';
import styles from './app.module.scss';
import { ProgressBar } from "react-bootstrap";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons : [],
      bars : [],
      limit : 0,
      selectValue: 1,
      selectBar: 0,
      barColor: [],
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.addToBar = this.addToBar.bind(this);   
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value, selectBar: e.target.value });
    // this.se
  }

  addToBar(e) {
    const newBars = [...this.state.bars];
    const newColors = [...this.state.barColor];
    let b = parseInt(this.state.bars[this.state.selectValue-1]) + parseInt(e.target.value);
    let barColor1 = "info";
    if(b>0 && b<=this.state.limit){
    }
    else if(b > this.state.limit){
      b = this.state.limit;
      barColor1 = "success";
    }
    else{
      b = 0
      barColor1 = "danger"
    }
    newBars[this.state.selectValue-1] = b ;
    newColors[this.state.selectValue-1] = barColor1 ;
    this.setState({ bars:newBars, barColor:newColors });
  }

  componentWillMount() {
      this.renderMyData();
  }

  async renderMyData(){
      await fetch('http://pb-api.herokuapp.com/bars')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ buttons : responseJson.buttons, bars : responseJson.bars , limit: responseJson.limit })
          })
          .catch((error) => {
            console.error(error);
          });
          
          this.setState({barColor: this.state.bars.map(bar => {
            if(bar > 0 && bar<=this.state.limit){
              return "info"
            }
            else if(bar > this.state.limit){
              return "success"
            }
            else{
              return "danger"
            }
          })})
  }


  render(){
    const { buttons, bars, limit,barColor } = this.state;

  return (
    <div className={styles['progress-bar-cont']}>
      <div className={styles['webcam-container']}> 
          <h1>Progess Bars </h1>
          {bars.map(s => (<ProgressBar className={styles['progress-bar-bar']}  variant={barColor[bars.indexOf(s)]} now={s} max= {limit}  min={0} label={`${s}%`} />))} 
          
          <div className={styles['btn-row']}>
              <select className={styles['dropdown-bar']}  id="dropdown" onChange={this.handleDropdownChange}>
                {bars.map(s => (<option value={bars.indexOf(s)+1}  >{`bar${bars.indexOf(s)+1}`}</option>))} 
              </select>

              {buttons.map(b => (<button style = {{margin: '0 20px 0 0'}} type="button" class="btn btn-success" value={b} onClick={(e) => this.addToBar(e, "value")}> {b}</button>))}  
          </div>   
      </div>
    </div>
  );
  }
}

export default App;
