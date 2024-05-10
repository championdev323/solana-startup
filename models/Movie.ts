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

  static borshAccountSchema = borsh.struct([
    borsh.bool("initialized"),
    borsh.u8("rating"),
    borsh.str("title"),
    borsh.str("description"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }

  static deserialize(buffer?: Buffer): MovieModel | null {
    if (!buffer) {
      return null;
    }

    try {
      const { title, rating, description } =
        this.borshAccountSchema.decode(buffer);
      // console.log({ title, rating, description });
      return new MovieModel(title, rating, description);
    } catch (error) {
      console.log("Deserialization error:", error);
      return null;
    }
  }
}

export default MovieModel;
