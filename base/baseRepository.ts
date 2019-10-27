import { IWrite } from '../interface/IWrite';
import { IRead } from '../interface/IRead';
import { promises } from 'dns';
import * as firebase from 'firebase';
import 'firebase/firestore';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
	public readonly _db: firebase.firestore.Firestore;
	public readonly _collectionName: string;
	public readonly _firebase: any;
	public readonly _app: firebase.app.App;
	public readonly _configuration: Readonly<any>;
	public get serverTimestamp(): string {
		return firebase.firestore.Timestamp.now().toDate().toString(); // Timestamp.now.toString();
	}

	constructor(collectionName?: string) {
		!firebase.apps.length
			? (this._app = firebase.initializeApp(configuration.firebaseConfig))
			: (this._app = firebase.app());
		if (firebase.apps.length) {
			this._db = this._app.firestore();
		}
		// const app = firebase.initializeApp(configuration.firebaseConfig);
		// this._db = firebase.firestore(app);
		this._firebase = this._app;
		this._collectionName = collectionName;
		this._configuration = configuration;
	}

	// success
	addCollection = async (item: T): Promise<firebase.firestore.DocumentReference> => {
		// Add a new document with a generated id.
		// const data = JSON.parse(JSON.stringify(item));
		// console.log(data);
		const result = await this._db.collection(this._collectionName).add({ ...item });
		return result;
	};

	addDocument = async (documentName: string, item: T): Promise<void> => {
		const result = await this._db.collection(this._collectionName).doc(documentName).set({ ...item });
		return result;
	};

	update = async (documentName: string, item: T): Promise<any> => {
		const documentRef = this._db
			.collection(this._collectionName)
			.doc(documentName)
			.update({ ...item })
			.then(() => Promise.resolve())
			.catch((error) => Promise.reject(error));
		// if (documentRef.collection.length <= 0) {
		// 	const result = await documentRef.update({ ...item });
		// 	return result;
		// } else {
		// 	console.log('error ', documentRef);
		// 	return Promise.reject(`${this._collectionName} collection not fount!!`);
		// }
	};

	async find(item: T): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	async findOne(id: string): Promise<T> {
		throw new Error('Method not implemented.');
	}

	async delete(id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}

// Save on secure place
const configuration = Object.freeze({
	firebaseConfig: {
		apiKey: 'XXXXXXXXXX',
		authDomain: 'XXXXXXXXXX',
		databaseURL: 'XXXXXXXXXX',
		projectId: 'XXXXXXXXXX',
		storageBucket: 'XXXXXXXXXX',
		messagingSenderId: 'XXXXXXXXXX',
		appId: 'XXXXXXXXXX'
	},
	facebook: {
		appId: 'XXXXXXXXXX'
	},
	google: {
		appId: 'XXXXXXXX'
	},
	linked_in: {
		appId: 'XXXXXXXX'
	},
	github: {
		appId: 'XXXXXXXX'
	}
});
