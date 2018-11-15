import React, {Component} from 'react'
import {List, SearchBar} from "antd-mobile";
import {connect} from 'react-redux'

import {queryLawsList} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Laws extends Component {

  state = {
    value: ''
  }

  componentDidMount() {
    console.log('News componentDidMount...')
    this.props.queryLawsList('')
    console.log('this.props.news', this.props.news)
  }

  onChange = (value) => {
    this.setState({value});
  };
  doSubmit = (value) => {
    console.log('doSubmit',value)
    this.props.queryLawsList(value)
  };

  render() {

    const {laws} = this.props

    return (
      <div>
        <SearchBar
          onSubmit={value => this.doSubmit(value)}
          onClear={() => this.setState({value: ''})}
          onCancel={() => this.setState({value: ''})}
          onChange={this.onChange}
          placeholder="Search"
          maxLength={8}
          style={{marginTop: 46}}/>

        <List className="my-list">
          {
            laws.map((o,i)=>(
              <Item key={i}
                multipleLine
                onClick={() => {
                  this.props.history.push(`/lawsdetail/${o.id}`)
                }}
                platform="android">
                {o.title}
                <Brief>{o.content}</Brief>
              </Item>
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({
    laws: state.laws
  }), {
    queryLawsList
  }
)(Laws)
