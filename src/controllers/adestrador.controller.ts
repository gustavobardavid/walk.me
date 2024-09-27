import { Request, Response } from 'express';
import AdestradorService from '../services/adestrador.service';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();
const secret = process.env.SECRET || ' ';

// Definindo esquemas de validação com Zod
const createSchema = z.object({
	nome: z.string().min(1, 'Nome é obrigatório'),
	email: z.string().email('Email inválido'),
	senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
	especialidade: z.string().min(1, 'Especialidade é obrigatória'),
});

const loginSchema = z.object({
	email: z.string().email('Email inválido'),
	senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});
class AdestradorController {
	public async getAllAdestradors(req: Request, res: Response): Promise<void> {
		try {
			const Adestradors = await AdestradorService.getAllAdestradors();
			res.json(Adestradors);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
	public async getAdestradorByPk(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		try {
			const Adestrador = await AdestradorService.getAdestradorByPk(id);
			res.json(Adestrador);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async createAdestrador(req: Request, res: Response): Promise<void> {
		// Validação do corpo da requisição
		const parsed = createSchema.safeParse(req.body);
		if (!parsed.success) {
			res.status(StatusCodes.BAD_REQUEST).json(parsed.error.format());
			return;
		}

		try {
			const { nome, email, especialidade, senha } = parsed.data;
			const Adestrador = await AdestradorService.createAdestrador(
				nome,
				email,
				especialidade,
				senha
			);
			res.status(StatusCodes.CREATED).json(Adestrador);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}

	public async removeAdestradorByPk(
		req: Request,
		res: Response
	): Promise<void> {
		const id = req.params.id;
		try {
			const adestradorRemoved =
				await AdestradorService.removeAdestradorByPk(id);
			res.status(StatusCodes.OK).json(adestradorRemoved);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Internal Server Error',
			});
		}
	}
	public async loginAdestrador(req: Request, res: Response): Promise<void> {
		// Validação do corpo da requisição
		const parsed = loginSchema.safeParse(req.body);
		if (!parsed.success) {
			res.status(StatusCodes.BAD_REQUEST).json(parsed.error.format());
			return;
		}
		const { email, senha } = parsed.data;
		const user = await AdestradorService.getAdestradorByEmail(email);
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json('Email não encontrado!');
		} else if (!(await bcrypt.compare(senha, user?.senha))) {
			res.status(StatusCodes.UNAUTHORIZED).json('Senha inválida!');
		}
		try {
			const token = jwt.sign(
				{
					id: user?.id,
				},
				secret
			);
			res.status(StatusCodes.OK).json(token);
		} catch (err) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
				'Não foi possível logar!'
			);
		}
	}
}

export default new AdestradorController();
