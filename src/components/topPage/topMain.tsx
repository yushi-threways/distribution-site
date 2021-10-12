import React, {FC, useState} from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';

import flower from "../../assets/images/wallpaper-g30b5326c5_1920.jpg"

const useStyle = makeStyles(() => 
    createStyles({
        background: {
            backgroundImage: `url(${flower})`,
            backgroundSize: 'cover',
            height: '100vh',
        },
        paper: {
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: "33%",
            width: "45%",
        }
    }),
)

const TopMain: FC = () => {
    const classes = useStyle();
    const [keyword, setKeyword] = useState("");
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setKeyword(event.target.value)
    }

    const handleSubmit = () => {
        history.push("/search/" + keyword);
    }

    return (
        <div className={classes.background}>
            <Paper className={classes.paper} onSubmit={handleSubmit} component="form">
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="無料素材を検索"
                    onChange={handleChange}
                />
            </Paper>
        </div>
    )
}

export default TopMain;