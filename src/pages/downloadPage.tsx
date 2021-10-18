import React, {FC, useEffect, useState} from "react";
import { useParams } from "react-router";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import firebase from "../firebase";
import TopHeader from "../components/topPage/topHeader";
import { TileDate } from "../types/types";
import { title } from "process";

const useStyle = makeStyles(() =>
    createStyles({
         tileImage: {
             height: "436px",
             width: "436px",
             objectFit: "cover",
        },
        main: {
            textAlign: "center",
            marginTop: "5%",
        },
    })
);



const DownloadPage: FC = () => {
    const {keyword}:any = useParams();
    const classes = useStyle();
    const [data, setData] = useState<TileDate[]>([]);

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

        setData(temporaryData as TileDate[]);
    }

    useEffect(() => {
        getData(keyword);
    }, []);

    const displayImage = () =>  {
        return (
            <div>
                {data.map((tile) => (
                    <div>
                        <img className={classes.tileImage} src={tile.image} alt={tile.title} />
                    </div>
                ))}
            </div>
        )
    }

    const downloadButton = () => {
        return (
            <div>
                {data.map((tile) => (
                    <Button
                        variant="contained"
                        href={tile.downloadUrl}
                    >
                        無料ダウンロード
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div>
            <TopHeader />
            <div className={classes.main}>
                {displayImage()}
                {downloadButton()}
            </div>
        </div>
    )
}

export default DownloadPage;