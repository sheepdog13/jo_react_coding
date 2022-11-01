import './App.css';
import { Component } from 'react';
import TOC from './components/TOC'
import Readcontent from './components/Readcontent';
import Subject from './components/Subject';
import Control from './components/Control';
import Createcontent from './components/Createcontent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for imformation'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <Readcontent title={_title} desc={_desc}></Readcontent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <Readcontent title={_content.title} desc={_content.desc}></Readcontent>
    } else if(this.state.mode == 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content}  onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i += 1;
        }
        this.setState({
          contents: _contents,
          mode:'read'
        })
      }.bind(this)}></UpdateContent>
    } else if(this.state.mode == 'create') {
      _article = <Createcontent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id += 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, titel:_title, desc:_desc}
        // );
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents: _contents,
          mode:'read',
          selected_content_id:this.max_content_id
        })
      }.bind(this)}></Createcontent>
    }
    return _article;
  }
  render() {
    console.log('render',this)
    return (
      <div className='App'>
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'})
          }.bind(this)}>
        </Subject>
        <TOC 
          onChangePage={function(id) {
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            })
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < this.state.contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i += 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!')
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
