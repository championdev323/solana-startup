import * as borsh from "@coral-xyz/borsh";

class MovieModel {
  title: string = "";
  rating: number = 0;
  description: string = "";

  constructor(_title: string, _rating: number, _description: string) {
    this.title = _title;
    this.rating = _rating;
    this.description = _description;
  }

  borshInstructionSchema = borsh.struct([
    borsh.u8("variant"),
    borsh.str("title"),
    borsh.u8("rating"),
    borsh.str("description"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }
}

export default MovieModel;
