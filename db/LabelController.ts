import { ILabel, IValidateLabelValues } from "@/lib/interfaces";
import DbConnector from "./DbConnector";
import { sectionNameRegex } from "@/lib/regex";

class LabelController extends DbConnector {
  constructor() {
    super();
  }

  private formatName(labelName: string): string {
    return labelName.toLowerCase().replace(/\s+/g, "-");
  }

  public validate(label: IValidateLabelValues): boolean {
    try {
      if (!label.name) return false;

      return sectionNameRegex.test(label.name);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async exists(userId: number, labelName: string): Promise<boolean> {
    const formattedName: string = this.formatName(labelName);

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

  public async getList(userId: number): Promise<ILabel[]> {
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
}

export default LabelController;
