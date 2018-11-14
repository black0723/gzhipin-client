import React,{Component} from 'react'
import {List, WhiteSpace,SearchBar} from "antd-mobile";

const Item = List.Item
const Brief = Item.Brief

export default class Laws extends Component{

  render() {
    return (
      <div>
        <SearchBar placeholder="Search" maxLength={8} style={{marginTop: 46}}/>

        <List className="my-list" >
          <Item
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>
        </List>
      </div>
    )
  }
}
