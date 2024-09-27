import { Request, Response } from 'express';
import PetService from '../services/pet.service';
import { StatusCodes } from 'http-status-codes';


class PetController {
	public async getAllPets(req: Request, res: Response): Promise<void> {
		try {
			const Pets = await PetService.getAllPets();
			res.json(Pets);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async getPetByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Pet = await PetService.getPetByPk(id);
			res.json(Pet);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async getPetsByTutorId(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Pet = await PetService.getPetsByTutorId(id);
			res.json(Pet);
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	public async createPet(req: Request, res: Response): Promise<void> {
		try {
			const { nome, raca, idade, tutorId } = req.body;
			const Pet = await PetService.createPet(nome, raca, idade, tutorId);
			res.status(StatusCodes.CREATED).json(Pet);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async removePetByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const petRemoved = await PetService.removePetByPk(id);
			res.status(StatusCodes.OK).json(petRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
}

export default new PetController();
