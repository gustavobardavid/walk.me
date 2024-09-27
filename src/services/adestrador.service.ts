import Adestrador from '../models/adestrador.model';
import Anuncio from '../models/anuncio.model';

class AdestradorService {
	public async getAllAdestradors() {
		return Adestrador.findAll();
	}

	public async getAdestradorByPk(id: string) {
		return Adestrador.findOne({
			where: { adestradorId: id },
			include: [{ model: Anuncio, as: 'anuncios' }],
		});
	}

	public async createAdestrador(
		nome: string,
		email: string,
		especialidade: string,
		senha: string
	) {
		return Adestrador.create({ nome, email, especialidade, senha });
	}

	public async updateAdestradorByPk(
		id: string,
		nome: string,
		email: string,
		especialidade: string,
		senha: string
	) {
		return Adestrador.update(
			{ nome, email, especialidade, senha },
			{
				where: { adestradorId: id },
			}
		);
	}

	public async removeAdestradorByPk(id: string) {
		return Adestrador.destroy({
			where: { adestradorId: id },
			cascade: true,
		});
	}
	public async getAdestradorByEmail(email: string) {
		return Adestrador.findOne({
			where: { email: email },
		});
	}
}

export default new AdestradorService();
