import { ILabel } from "@/lib/interfaces";
import DbConnector from "./DbConnector";

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
      return !!(await this.prisma.label.count({
        where: {
          uid: userId,
          name: formattedName,
        },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default LabelController;
