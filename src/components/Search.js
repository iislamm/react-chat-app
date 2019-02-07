import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';

const styles = {
    add: {
        cursor: 'pointer',
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            result: null,
            found: false,
            isFriend: false,
        }
    }

    handleChange = e => {
        this.setState({ search: e.target.value });
        this.searchUsers();
    }

    searchUsers = () => {
        var user = firebase.auth().currentUser;
        if (this.state.search === user.uid) {
            return;
        }
        const db = firebase.firestore();
        db.collection('users')
            .where('email', '==', this.state.search)
            .get()
            .then(resultSnapshot => {
                if (!resultSnapshot.empty) {
                    let result = resultSnapshot.docs[0].data();
                    this.setState({ result, found: true});
                    if (this.props.isFriend(result.uid)) {
                        this.setState({ isFriend: true });
                    } else {
                        this.setState({ isFriend: false });
                    }
                } else {
                    this.setState({ result: false });
                }
            }).catch(error => console.log(error));
    }

    renderResults = (classes) => {
        if (this.state.found === true) {
            return (
                <MenuList>
                    <MenuItem onClick={() => this.props.addFriend(this.state.result.uid)}>
                        <ListItemIcon>
                            {this.state.isFriend === true ? <PersonIcon /> : <PersonAddIcon className={classes.add} /> }
                        </ListItemIcon>
                        <ListItemText inset primary={this.state.result.displayName} />
                    </MenuItem>
                </MenuList>
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    placeholder="Search with email"
                    fullWidth
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                {this.renderResults(classes)}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Search);