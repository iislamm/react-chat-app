import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';

import * as firebase from 'firebase';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class MessagesList extends React.Component {

  renderChatList = (chats, classes) => {
    console.log('props', this.props);
    return (
      <MenuList>
            {
              Object.keys(chats).map((k, i) => {
                if (chats[k].messages.length != 0) {
                  return (
                    <MenuItem key={chats[k].participant.uid} className={classes.menuItem} onClick={() => this.props.setCurrentChat(chats[k].id)}>
                      <ListItemIcon className={classes.icon}>
                          <ChatIcon />
                      </ListItemIcon>
                      <ListItemText classes={{ primary: classes.primary }} inset primary={chats[k].participant.displayName} />
                  </MenuItem>
                  )
                }
              })}
        </MenuList>
    )
  }
  
  render() {
    const { classes } = this.props;
    const chats = this.props.chats;
    return this.renderChatList(chats, classes);
  }
}
export default withStyles(styles)(MessagesList);