import DbConnector from "./DbConnector";

export interface ILabel {
  id: number;
  name: string;
}

class LabelController extends DbConnector {
  constructor() {
    super();
  }

  private formatName(labelName: string): string {
    return labelName.toLowerCase().replace(/\s+/g, "-");
  }

  public async getAll(userId: number): Promise<ILabel[]> {
    try {
      return await this.prisma.label.findMany({
        where: {
          uid: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async exists(userId: number, labelName: string): Promise<boolean> {
    const formattedName = this.formatName(labelName);

    try {
      const isDuplicate = await this.prisma.label.findFirst({
        where: {
          uid: userId,
          name: formattedName,
        },
      });

      return !!isDuplicate;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default LabelController;
