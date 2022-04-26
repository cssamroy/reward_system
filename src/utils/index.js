import { months } from '../constants/color';

const calculateRewards = (price) => {
  if (price >= 50 && price < 100) {
    return price - 50;
  } else if (price > 100) {
    return 2 * (price - 100) + 50;
  }
  return 0;
};

export const calculateResults = (data) => {
  let perCustomer = {};
  let totalPointsByCustomer = {};
  let totalsByCustomer = [];
  let totals = [];

  const getPointsPerTransaction = data.map((transaction) => {
    let points = calculateRewards(transaction.amount);
    const month = new Date(transaction.transactionDate).getMonth();
    return { ...transaction, points, month };
  });

  getPointsPerTransaction.forEach((getPointsPerTransaction) => {
    let { customerId, name, month, points } = getPointsPerTransaction;
    if (!perCustomer[customerId]) {
      perCustomer[customerId] = [];
    }

    if (!totalPointsByCustomer[name]) {
      totalPointsByCustomer[name] = 0;
    }

    totalPointsByCustomer[name] += points;

    if (perCustomer[customerId][month]) {
      perCustomer[customerId][month].points += points;
      perCustomer[customerId][month].monthNumber = month;
      perCustomer[customerId][month].numTransactions++;
    } else {
      perCustomer[customerId][month] = {
        customerId,
        name,
        monthNumber: month,
        month: months[month],
        numTransactions: 1,
        points,
      };
    }
  });

  for (var customerKey in perCustomer) {
    perCustomer[customerKey].forEach((cRow) => {
      totals.push(cRow);
    });
  }
  for (customerKey in totalPointsByCustomer) {
    totalsByCustomer.push({
      name: customerKey,
      points: totalPointsByCustomer[customerKey],
    });
  }

  return {
    summaryByCustomer: totals,
    totalPointsByCustomer: totalsByCustomer,
  };
};
