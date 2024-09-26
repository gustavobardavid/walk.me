import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
} from 'sequelize-typescript';
import Tutor from './tutor.model';

@Table
export default class Pet extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	petId!: string;

	@Column(DataType.STRING)
	nome!: string;

	@Column(DataType.STRING)
	raca!: string;

	@Column(DataType.INTEGER)
	idade!: number;

	@Column(DataType.STRING)
	foto?: string;

	@ForeignKey(() => Tutor)
	@Column(DataType.UUID)
	tutorId!: string;

	@BelongsTo(() => Tutor)
	tutor!: Tutor;
}
