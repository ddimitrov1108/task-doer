import DbConnector from "./DbConnector";

export default class AppController extends DbConnector {
  constructor() {
    super();
  }

  public async getNavigation(userId: string) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    try {
      const today = await this.prisma.task.count({
        where: { userId: userId, dueDate: todayDate },
        take: 11,
      });

      const future = await this.prisma.task.count({
        where: { userId: userId, dueDate: { gte: todayDate } },
        take: 11,
      });

      const important = await this.prisma.task.count({
        where: { userId: userId, important: true },
        take: 11,
      });

      const completed = await this.prisma.task.count({
        where: { userId: userId, completed: true },
        take: 11,
      });

      const all = await this.prisma.task.count({
        where: { userId: userId },
      });

      return {
        tasksCount: {
          today,
          future,
          important,
          completed,
          all,
        },
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
