import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_HOST,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		window.sessionStorage.removeItem('currentUser')
		return this.auth.signOut()
	}

	async register(name, email, password) {
		const response = await this.auth.createUserWithEmailAndPassword(email, password)
		this.auth.currentUser.updateProfile({
			displayName: name
		})
		window.sessionStorage.setItem('currentUser', JSON.stringigy(response.user))
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return (this.auth.currentUser && this.auth.currentUser.displayName) || (window.sessionStorage.getItem('currentUser') && JSON.parse(window.sessionStorage.getItem('currentUser')).displayName)
	}

    sendResetPasswordEmail(email) {
        return this.auth.sendPasswordResetEmail(email)
    }

}

export default new Firebase()