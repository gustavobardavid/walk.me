import Pet from '../models/pet.model';
import Tutor from '../models/tutor.model';

class TutorService {
	public async getAllTutors() {
		return Tutor.findAll();
	}

	public async getTutorByPk(id: string) {
		return Tutor.findOne({
			where: { tutorId: id },
			include: [{ model: Pet, as: 'pets' }],
		});
	}

	public async createTutor(nome: string, email: string, senha: string) {
		return Tutor.create({ nome, email, senha });
	}

	public async updateTutorByPk(
		id: string,
		nome: string,
		email: string,
		senha: string
	) {
		return Tutor.update(
			{ nome, email, senha },
			{
				where: { tutorId: id },
			}
		);
	}

	public async removeTutorByPk(id: string) {
		return Tutor.destroy({
			where: { tutorId: id },
			cascade: true,
		});
	}
	public async getTutorByEmail(email: string) {
		return Tutor.findOne({
			where: { email: email },
		});
	}
}

export default new TutorService();
