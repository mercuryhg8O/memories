@Injectable()
export class EmailService {
    constructor(_emailModel) { }
    
    async create(email) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.value.match(validRegex)) {
            const createdEmail = new this.emailModel({
                email: email
            });
            await createdEmail.save();
        } else {
            pass;
        }
    }
}