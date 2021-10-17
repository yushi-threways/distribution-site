import React, {FC, useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import firebase from "../../firebase";
import {TitleDate} from "../../types/types";

const useStyles = makeStyles(() => 
    createStyles({
        root : {
            display: "flex",
            flexWrap: "wrap",
            width: "80%",
            textAlign: "center",
            marginTop: "2%",
        },
        tileImage: {
            height: "218px",
            width: "218px",
            objectFit: "cover",
        },
    }),
);


const ImageItemList: FC = () => {

    const [data, setDate] = useState<TitleDate[]>([]);
    const { keyword }:any = useParams();
    const classes = useStyles();
    const history = useHistory();

    const getData = async (searchWord: string | undefined ) => {
        const db = firebase.firestore();
        // 引数は取得すすコレクション名にする
        const titleDataRef = db.collection("titleData");
        // どのドキュメントのフィールドを取得するか指定
        // titleData コレクションから条件に合致したドキュメントを探す keyword
        // 引数 フィールド名 比較演算 
        const searchedData = titleDataRef.where("keyword", "array-contains", searchWord);
        const snapShot = await searchedData.get();

        const temporaryData: object[] = [];

        snapShot.docs.map(doc => {
            temporaryData.push(doc.data());
        })

        setDate(temporaryData as TitleDate[]);
    }

    useEffect(() => {
        getData(keyword);
    },[]);
        
    return (
        <div className={classes.root}>
        {data.map((tile) => (
            <div>
                <Button
                    onClick={() => history.push("/download/" + tile.title)}
                >
                    <img className={classes.tileImage} src={tile.image} alt={tile.title} />
                </Button>
                    <h3>{tile.title}</h3>
            </div>
        ))}
        </div>
    );
}

export default ImageItemList;