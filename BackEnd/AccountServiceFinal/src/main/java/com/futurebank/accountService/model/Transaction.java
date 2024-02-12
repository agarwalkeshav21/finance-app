package com.futurebank.accountService.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transactions") // Specify table name for clarity
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private Long fromAccountId;

    @Column(nullable = false)
    private Long toAccountId;

    @Column(nullable = false, precision = 19, scale = 4) // Define precision and scale if necessary
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50) // Specify length according to the longest enum value
    private MyTransactionCategory category;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    // Removed getCategory and setCategory methods as Lombok's @Getter and @Setter annotations take care of them.
    // Ensure your category field in the Transaction entity matches the type directly with your enum.
    // This makes your code cleaner and leverages Lombok's functionality fully.

    // Consider adding constructors if necessary, for example:
    public Transaction() {
        // No-args constructor
    }

    // Optionally, add a constructor for creating a Transaction with all fields initialized
    public Transaction(Long fromAccountId, Long toAccountId, BigDecimal amount, MyTransactionCategory category, LocalDateTime transactionDate) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.category = category;
        this.transactionDate = transactionDate;
    }

	public MyTransactionCategory getCategory() {
		// TODO Auto-generated method stub
		return category;
	}

	public BigDecimal getAmount() {
		// TODO Auto-generated method stub
		return amount;
	}

	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", fromAccountId=" + fromAccountId + ", toAccountId="
				+ toAccountId + ", amount=" + amount + ", category=" + category + ", transactionDate=" + transactionDate
				+ "]";
	}
}
