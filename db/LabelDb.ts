import { ILabel } from "@/lib/interfaces";
import prisma from "@/lib/prisma";

const formatLabelName = (labelName: string) =>
  labelName.toLowerCase().replace(/\s+/g, "-");

const isLabelDuplucated = async (
  userId: number,
  labelName: string
): Promise<boolean> => {
  const formattedName = formatLabelName(labelName);

  try {
    const isDuplicate = await prisma.label.findFirst({
      where: {
        uid: userId,
        name: formattedName,
      },
    });

    return !!isDuplicate;
  } catch (e) {
    console.error(e);
    return true;
  }
};

const getLabels = async (userId: number): Promise<ILabel[]> => {
  try {
    return await prisma.label.findMany({
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
};

export { getLabels, isLabelDuplucated };
