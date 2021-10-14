import React, {FC, useState} from "react";
import firebase from "../../firebase";
import {TitleDate} from "../../types/types"

const ImageItemList: FC = () =>  {

    const [data, setDate] = useState<TitleDate[]>([]);

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
        
    return (
        <div>

        </div>
    );
}