import { addDoc, collection, CollectionReference, Firestore, getDocs, query, where } from "firebase/firestore";

export default class myFB{
    private db: Firestore;
    private col: CollectionReference;
  
    constructor( db: Firestore){
        this.db=db;
        this.col = collection(this.db, 'dictionary');
  
      }
  
      public async add(WordCodeP:string, CodeLanguage: string,  Text: string){
        //check eng value
        const WordCode = WordCodeP.trim().toLowerCase();
        if(CodeLanguage!=="en"){
          const result = await this.get(WordCodeP,"en");
          if(!result.success) return result;
        }
        //check duplicates
        const result = await this.get(WordCodeP,CodeLanguage);
        if(result.success) return {success: false, message:"This WordCode already exist!"};
        
        //adding
        const resultSet = await addDoc (this.col, {
          CodeLanguage,
          WordCode,
          Text
        });
        if(resultSet.id) return {success:true}
        else return {success:false} 
 
      }
  
      public async get(WordCodeP:string, CodeLanguage: string){
        const WordCode = WordCodeP.trim().toLocaleLowerCase();
        const q = query(this.col, where("CodeLanguage", "==", CodeLanguage), where("WordCode","==",WordCode));
        const docs = await getDocs(q);
        if(!docs.docs.length){
          return {success: false, message:"not found"}
        }else{
          return {success:true, message: docs.docs[0].data().Text }
        }
      }
  
  }
  