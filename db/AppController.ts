import DbConnector from "./DbConnector";

const TODAY_COUNT_LIMIT = 11;

class AppController extends DbConnector {
  constructor() {
    super();
  }

  public async getNavigation(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);


    try {
      const [
        todayTaskCount,
        futureTaskCount,
        importantTaskCount,
        totalTaskCount,
      ] = await this.prisma.$transaction([
        this.prisma.task.count({
          where: { userId: userId, dueDate: { gte: today, lt: tomorrow } },
          take: TODAY_COUNT_LIMIT,
        }),
        this.prisma.task.count({
          where: { userId: userId, dueDate: { gte: tomorrow } },
          take: TODAY_COUNT_LIMIT,
        }),
        this.prisma.task.count({
          where: { userId: userId, important: true },
          take: TODAY_COUNT_LIMIT,
        }),
        this.prisma.task.count({
          where: { userId: userId, completed: false },
        }),
      ]);

      const [projects, labels] = await Promise.all([
        (await import("./ProjectController")).default.getList(userId),
        (await import("./LabelController")).default.getList(userId),
      ]);

      return {
        count: [
          todayTaskCount,
          futureTaskCount,
          importantTaskCount,
          totalTaskCount,
          0,
        ],
        projects,
        labels,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

const appController = new AppController();
export default appController;
