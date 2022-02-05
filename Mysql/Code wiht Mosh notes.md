* compare date：

```mysql
SELECT *  
FROM customers 
WHERE birth_date > '1990-01-01'; 
```

 \#这里只能用双引号或者单引号

* or

```mysql
 SELECT *  
 FROM customers 
 WHERE birth_date >'1990-00-00' or points > 1000 AND state = 'VA'; 
 \# and拥有比or更高的优先级，所以上一句等价于： 
 \# WHERE birth_date >'1990-00-00' or (points > 1000 and state = 'VA');

like：

-- % any number of characters -- _ single character
```

```mysql

 SELECT *  
 FROM customers  
 WHERE last_name LIKE 'b%';  
 或者 WHERE last_name LIKE '___y' 
```

```mysql
REGEXP：
-- ^ beginning -- $ END -- | logical or -- [abcd] specific letters -- [a-z] range a - z
```

```mysql
 SELECT *
 FROM customers 
 WHERE last_name REGEXP 'field';
 -- 上面正则表达式跟下面语句意思一样
 -- WHERE last_name LIKE '%field%'
 
 -- 以下表示必须以field开头
 -- WHERE last_name REGEXP '^field';
 
 -- 以下表示必须以field结尾
 -- WHERE last_name REGEXP 'field$'
 
 -- 名字中包含field或者名字中包含mac的顾客
 -- WHERE last_name REGEXP 'field | mac'
 
 -- 名字中ge ie me的顾客的名字
 -- WHERE last_name REGEXP '[gim]e';
 
 -- WHERE last_name REGEXP '[a-z]e';
```

```mysql
 SELECT *
 FROM customers
 WHERE first_name  REGEXP 'ambur|elka';
 -- be careful, no space before and after |, otherweISe no result
```

* Search for absent value:

```mysql
SELECT *
FROM customers
WHERE phone IS NULL;
```

 ​

* Get the order that are NOT shipped yet

```mysql
 SELECT *
 FROM orders
 WHERE shipped_date IS NULL;
```

* ORDER BY:

```mysql
 SELECT first_name, last_name, 10 AS points
 FROM customers
 ORDER BY birth_date, points 
 -- no problem, but may NOT work in other type of Database
```

 ​
 ​

```mysql
 SELECT first_name, last_name, 10 AS points
 FROM customers
 ORDER BY 1, 2 
 -- first ORDER BY first_name, THENORDER BY last_name, it works, but should avoid do it
```

* LIMIT:

```mysql
 SELECT *
 FROM customers
 LIMIT 6,3
 -- skip 6 records THENpick 3 records 
 -- LIMIT should always comes at the last
```

* (inner) JOIN:

```mysql
 SELECT customers.customer_id, order_id, first_name, last_name
 FROM orders
 JOIN customers 
 ON customers.customer_id = orders.customer_id;
```

* Or:

```mysql
 SELECT c.customer_id, order_id, first_name, last_name
 FROM orders o
 JOIN customers c 
 ON c.customer_id = o.customer_id;
```

 ​ ​

Exercise:

```mysql
 SELECT *
 FROM order_items o 
 JOIN products p ON o.product_id = p.product_id;
```

```mysql
 USE sql_inventory;
 SELECT *
 FROM sql_store.order_items oi  
 -- we're NOT in the databse table sql_store, so we have to prefix the databASe name before the table 
 -- order_items
 JOIN products p 
 ON oi.product_id = p.product_id
```



* JOIN a table with itself：

```mysql
SELECT e.employee_id,
  	   e.first_name,
       m.first_name manager
 FROM employees e
 JOIN employees m ON e.reports_to = m.employee_id;
```



* JOIN more than two tables:

```mysql
 SELECT c.name, c.client_id, p.amount, pm.name
 FROM payments p 
 JOIN clients c 
 ON p.client_id = c.client_id 
 JOIN payment_methods pm 
 ON pm.payment_method_id = p.payment_method;
```



* Composite Primary Key:

```mysql
SELECT *
FROM order_items oi
JOIN order_item_notes oin
	 ON  oi.order_id = oin.order_id
	 AND oi.product_id = oin.product_id;
```



* Implicit Join Syntax 隐式连接如下， 不推荐使用。

```mysql
SELECT *
FROM orders o , customers c 
WHERE o.customer_id = c.customer_id;
```



**Outer JOIN**

* LEFT JOIN

  -- all the records of customer_id, first_name and order_id from the customers table will be returned, 

  ​    whether condition after ON is  true or not.

  -- the outer key word is optional

```mysql
SELECT 
	c.customer_id,
    c.first_name,
	o.order_id
FROM customers c
LEFT OUTER JOIN orders o
	ON c.customers_id = o.customer_id
ORDER BY c.customer_id;
```





* RIGHT JOIN

```mysql
SELECT 
	c.customer_id,
	c.first_name,
	o.order_id
FROM customers c
RIGHT OUTER JOIN orders o
    ON c.customers_id = o.customer_id
ORDER BY c.customer_id;
-- all the records of customer_id, first_name and order_id from the orders table will be returned, whether the condition after ON is true or not.
-- the OUTER key word is optional
```



* Joining more Tables:

```mysql
 SELECT 
	 c.customer_id,
	 c.first_name,
	 o.order_id,
	 sh.name AS shipper
 FROM customers c
 LEFT JOIN orders o
 	ON c.customers_id = o.customer_id
 LEFT JOIN shippers sh
	 ON o.shipper_id = sh.shipper_id
 ORDER BY c.customer_id;
```



* Self Outer Join 自外连接：

```mysql
 SELECT e.employee_id,
  		e.first_name,
   		m.first_name manager
 LEFT FROM employees e
 JOIN employees m 
 	ON e.reports_to = m.employee_id;
```



* USING clause:

```mysql
 SELECT 	
 	c.customer_id,
	 c.first_name,
	 o.order_id,
 FROM customers c
 JOIN orders o
 -- c.customers_id = o.customer_id;
 USING (customers_id);  
 -- only works when column name are the same
```

 

* Natural Joins 

```mysql
SELECT *
FROM orders
NATURAL JOIN customers;
-- not recommended， produce unexpected result
```



* Cross Join：

```mysql
SELECT 
     c.first_name name
     p.name product
FROM customers c
CROSS JOIN products p
-- or like this:
-- from customers c, products p
ORDER BY c.first_name;
Unions
Combine records from several queries.
```



* UNION

列名显示第一个表的, 查询结果列的数量要相同，否则无法union

```mysql
SELECT 
   	order_id,
    order_date,
   'Active' AS status
FROM orders
WHERE order_date >= '2019-01-01'
UNION
SELECT 
	order_id,
	order_date,
	'Archived' AS status
FROM orders
WHERE order_date < '2019-01-01'
```



**Chapter 4 : Column Attribute**

* Insert Into

  -- 顺序可变，但是要前后对应

```mysql
INSERT INTO customers
VALUES (default, 'John', 'Smith', '1990-01-01', NULL, 'address', 'city', 'CA',default);
INSERT INTO customers(first_name, last_name, birth_date, address, city, state)
VALUES ('John', 'Smith', '1990-01-01', 'address', 'city', 'CA');

```



* INSERT multiple rows in one go

```mysql
INSERT INTO shippers(name)
VALUES  ('shipper1'),
 		('shipper2'),
 		('shipper3');
```



* Insert Hierarchical Rows 多个表中插入行

```mysql
 INSERT INTO orders(customer_id, order_date, status)
 VALUES(1,'2019-01-02', 1); 
```

```mysql
 INSERT INTO order_items
 VALUES(LAST_INSERT_ID(), 1,1,2,95)
 VALUES(LAST_INSERT_ID(), 1,1,2,95);
```



* Create a Copy

```mysql
 USE sql_invoicing;
 CREATE table invoices_archive AS
 SELECT 
 	 i.invoice_id,
 	 i.number,
 	 c.name,
  	 i.invoice_total,
 	 i.payment_total
 FROM invoices i
 JOIN clients c 
 	ON c.client_id = i.client_id
 WHERE i.payment_date IS NOT NULL;
```



* Updating Multiple Rows:

```mysql
UPDATE customers
SET points = points + 50
WHERE birth_date < '1990-01-01';

```



* Using Subqueries in Update:

```mysql
SET comments = "gold customer"
WHERE customer_id in 
  				(SELECT customer_id
  				 FROM customers
   				 WHERE points>3000) ;
```



* Delete:

```mysql
DELETE FROM invoices
WHERE invoice_id = 1;
```



**Chapter 5: Aggregate Functions:**

```mysql
SELECT MAX(payment_date)
  	   MIN(invoice_total)
	   AVG(invoice_total)
	   SUM(invoice_total * 1.1)
	   COUNT(invoice_total)
    -- count returns not null invoice_total
       COUNT(*) AS total_records
       COUNT(distinct client_id)
FROM invoices
WHERE invoice_date > '2019-01-01';
```




```mysql
USE sql_invoicing;
SELECT 
	  'First half of 2019' AS date_range,
	  SUM(invoice_total) AS total_sales,
 	  SUM(payment_total) AS total_payments,
 	  SUM(invoice_total)-SUM(payment_total) AS 'what we expect'
 FROM invoices
 WHERE payment_date between '2019-01-01' and '2019-06-30'
 UNION
 SELECT 
 	 'second half of 2019' AS date_range,
 	 SUM(invoice_total) AS total_sales,
  	 SUM(payment_total) AS total_payments,
  	 SUM(invoice_total)-SUM(payment_total) AS 'what we expect'
 FROM invoices
 WHERE payment_date between '2019-07-01' and '2019-12-31'
 UNION
 SELECT 
 	 'Total' AS date_range,
  	 SUM(invoice_total),
 	 SUM(payment_total),
     SUM(invoice_total - payment_total)
 FROM invoices i
 WHERE payment_date between '2019-01-01' and '2019-12-31';
```



* GROUP BY:

```mysql
 SELECT 
 	client_id,
    SUM(invoice_total) AS total_sales
 FROM invoices
 WHERE invoice_date > '2019-07-01'
 GROUP BY client_id
 ORDER BY totao_sales desc;
```

```mysql
SELECT
	date, 
    payment_method,
    SUM(amount) total_payment
FROM payments
GROUP BY date,payment_method
ORDER BY date;
```



* HAVING
  Using HAVING clause to filter data after GROUP BY， only reference to columns selected.
  Whereas filter data before GROUP BY, can reference any columns.

  HAVING 语句后面的选项一定是SELECT里选择了的列。WHERE后面可以随便跟那个列。

```mysql
 SELECT 
   	 first_name,
 	 last_name,
 	 order_id,
   	 SUM(oi.quantity*oi.unit_price) AS order_price
 FROM customers c
 LEFT JOIN orders o USING (customer_id)
 LEFT JOIN order_items oi USING(order_id)
 WHERE (o.order_id IS NOT NULL) AND (c.state = 'VA')
 GROUP BY 
 	 first_name,
 	 last_name,
 	 order_id
 HAVING order_price > 100;
```



* Rollup:

```mysql
 SELECT 
 	pm.name AS 'payment method',
    SUM(amount)
 FROM payments p
 JOIN payment_methods pm
 	ON p.payment_method = pm.payment_method_id
 GROUP BY pm.name WITH ROLLUP;
```



**Chapter 6: Complicated Subqueries** 

```mysql
 USE sql_store;
 SELECT *
 FROM products 
 WHERE unit_price > (
 					SELECT 
 					unit_price
 					FROM products
 					WHERE product_id = 3
 					);
```

```mysql
 USE sql_hr;
 SELECT *
 FROM employees
 WHERE salary > (
                 SELECT AVG(salary)
                   FROM employees
                 );
```



Find products that had never been ordered.

```
 USE sql_store;
 SELECT *
 FROM products
 WHERE product_id NOT in (
                     SELECT product_id
                       FROM order_items
                     );
```

Pay Attention to Readability.

P48 find the customers who had ordered Lettuce, product_id = 3.

```mysql
 SELECT 
 	 c.customer_id,
	 c.first_name,
 	 c.last_name
 FROM customers c
 JOIN orders o USING(customer_id)
 JOIN order_items oi USING(order_id)
 WHERE oi.product_id = 3;
```



* USE All:

```mysql
 USE sql_invoicing;
 SELECT *
 FROM invoices
 WHERE invoice_total > All(
                     SELECT invoice_total
                     FROM invoices
                     WHERE client_id = 3
 );
```



* USE Any:

```mysql
 SELECT *
 FROM invoices
 WHERE invoice_total = Any (
                     SELECT invoice_total
                       FROM invoices
                       WHERE client_id = 3
 );
```



* Correlated Subqueries相关子查询：

```mysql
SELECT *
FROM employees e
WHERE salary > (
                SELECT AVG(salary)
                FROM employees
                WHERE office_id = e.office_id
);
```



* Exits Operator:

  More Efficiency Than In Operator.

```mysql
SELECT *
FROM products p
WHERE NOT EXISTS (
          SELECT 
          product_id
          FROM order_items
    	  WHERE p.product_id = product_id
);
```



* Subqueries in SELECT clause:

```mysql
 SELECT 
 	 invoice_id,
 	 invoice_total,
 	 (SELECT AVG(invoice_total) FROM invoices) AS invoice_AVG,
 invoice_total - (SELECT invoice_AVG)
   -- 注意这里SELECT invoice_AVG，必须这样，否则识别不了invoice_AVG
 FROM invoices;
```




* Subqueries in from clause:

  

**Chapter 7: Numeric Functions**

* Numeric and String function:

```mysql
 SELECT ROUND(5.7345,2);  5.73 四舍五入
 SELECT ROUND(5.7345,2);  5.73 截断
 SELECT CEILING(5.7)  6 
 SELECT FLOOR(5.2) 5
 SELECT ABS(-5.2)  5.2
 SELECT RAND() 生成0-1之间的随机浮点数
 SELECT LENGTH('SKY') 3
 SELECT UPPER('sky') SKY
 SELECT LOWER('SKY') sky
 SELECT LTRIM(' Sky') 删除左边空格
 SELECT RTRIM('Sky  ') 删除右边空格
 SELECT LEFT('Kindergarten'， 6) 返回字符串右侧的6个字符
 SELECT SUBSTRING('Kindergarten'，3,5) 从3开始选取5个字符
 SELECT LOCATE('n','Kindergarten') 找出有几个n，不区分大小写
 SELECT LOCATE('q','Kindergarten') 没找到，返回0
 SELECT REPLACE('Kindergarten', 'garten', 'garden') 输出：Kindergarden
 SELECT CONCAT('first', 'last') firstlast
```



* Date and Time

```mysql
SELECT  NOW(),
        CURDATE(),
        CURTIME(),
        YEAR(NOW()),
        MOUTH(NOW()),
        DAY(NOW()),
        HOUR(NOW()),
        DAYNAME(NOW()), 星期几
        MOUTHNAME(NOW()) 月的名字比如March
SELECT EXTRACT(YEAR FROM NOW());
SELECT DATE_FORMAT(NOW(), '%M %d %Y')
SELECT TIME_FORMAT(NOW(), '%H: %i %p')
```

```mysql
SELECT DATE_ADD(NOW(), interval 1 day) 返回明天同一时间
SELECT DATE_SUB(NOW(), interval 1 YEAR)
SELECT DATEDIFF('2019-01-05 09:00', '2019-01-01 17:00') 得到的结果依然是4，不考虑时间
SELECT TIME_TO_SEC('9:00')-TIME_TO_SEC('9:02')
```



* IFNULL and COALESCE Functions

```mysql
SELECT 
	order_id,
	IFNULL(shipper_id, 'NOT assigned')
-- if the shipper_id is null, not assigned will be returned
FROM orders
```

```mysql
SELECT 
   order_id,
   COALESCE(shipper_id, comment, not assigned')
-- if the shipper_id is null, commets will be returned,
-- if commets are null, not assigned will be returned from orders
```

*14.06.2021*

* The IF Function

  IF(expression, first, second)

```mysql
 SELECT 
	 order_id, 
	 order_date, 
 IF(YEAR(order_date=YEAR(NOW())), 'Active', 'Archived')
 FROM orders
```

​	Exercise:

```mysql
 SELECT 
 	product_id,
    p.name,
    COUNT(*),
    IF(count(*)>1, 'Many times', 'ONce') AS frequency
 FROM order_items
 JOIN products p USING (product_id)
 GROUP BY product_id
```



* The Case function

  Test multiple expressions.

```mysql
 SELECT 
  	 CONCAT(first_name, ' ', last_name) AS customer,
 	 points,
   	 CASE
         WHEN points > 3000 THEN'Gold'
         WHEN points >= 2000 THEN'Silver'
         ELSE 'BrONze'
 	END AS category
 FROM customers
 ORDER BY points desc;
```

​	

**Chapter 8: Creating views**

* Create views

```mysql
 CREATE view sales_by_client AS sales_by_cleint
 SELECT
	 client_id,
 	 c.name,
  	 SUM(invoice_total - payment_total) AS balance
 FROM invoices
 JOIN clients c USING(client_id);
 
 GROUP BY client_id, c.name; 
```



* Drop Views

```mysql
DROP VIEW sales_by_cleint;
```



* Update Views

  **Updatable View**

  without the following key words, a view is updatable.

  -- distinct

  -- aggregate functions(MIN, MAX, AVG...)

  -- GROUP BY/HAVING

  -- UNION

We can update the view like this:

```mysql
 DELETE FROM invoices_with_balance
 WHERE invoice_id = 1;
```

```mysql
 UPDATE invoices_wiht_balance
 SET due_date = date_add(due_date, INTERVAL 2 day)
 WHERE invoice_id = 2;
```

如果视图只有表的一部分列，那么更新视图的时候必须更新表中所有的列，即使这些列视图里没有。

修改视图以后行可能会消失，为了防止这样的行为产生，可以使用with check option

Benefits of Views:

1, simplify the queries

2, reduce the impact of changes, due to database design

3, Restrict access to the data

 

**Chapter 9 : Stored Procedures**

-- Write SQL like the following 

-- or click the 'stored procedure' -> create stored procedure' in MySQL.

```mysql
 DELIMITER $$
 CREATE PROCEDURE balance()
 BEGIN
     SELECT *
     FROM invoices
     WHERE invoice_total - payment_total > 0;
 END $$
 DELIMITER ;
 CALL balance();
```



* Dropping Procedures:

```mysql
DROP PROCEDURE get_invoices_by_client;
```



* Drop procedure if exists balance:

```mysql
DROP PROCEDURE IF EXISTS get_invoices_by_client;
```



* Add Parameter to Procedures:

```mysql
-- write a stored PROCEDURE to return invoices for a given client, with the name "get_invoices_by_client"
 DELIMITER $$
 CREATE PROCEDURE get_invoices_by_client(client_id int)
 BEGIN 
     SELECT *
     FROM invoices i
     WHERE i.client_id = client_id;
 END $$
 DELIMITER ;
 CALL get_invoices_by_client(2);
 
```



Exercise

Write a stored procedure called get_payment with two parameters: client_id, payment_method_id, returns the payments by given parameters.

```mysql
DELIMITER $$
CREATE PROCEDURE get_payments(client_id INT, payment_method_id TINYINT)
BEGIN
	SELECT *
    FROM payments p
    WHERE 
		p.client_id = IFNULL(client_id, p.client_id) AND
        P.payment_method = IFNULL(payment_method_id, p.payment_method);
END $$
DELIMITER ;
call get_payments(NULL, 1);
```



* Validation:

```mysql
-- Keep validation in SQL minimal
-- Do more comprehensive validation in Application, as the time get input from the users. It's much faster.
```



* Output Parameter:

```mysql
DELIMITER $$
CREATE PROCEDURE get_unpaid_invoices_for_client
(
	client_id INT,
    OUT invoices_count INT,
    OUT invoices_total DECIMAL(9,2)
) 
BEGIN
	SELECT COUNT(*),  SUM(invoice_total)
	INTO  invoices_count, invoices_total
	from invoices i
	WHERE i.client_id = client_id
		AND i.payment_total = 0;
END $$
DELIMITER ;
```



* User or Session Variables

```mysql
DELIMITER $$     
CREATE PROCEDURE get_risk_factor()
BEGIN 
	DECLARE risk_factor DECIMAL(9,2) DEFAULT 0;
    DECLARE invoices_count INT;
    DECLARE invoices_total DECIMAL(9,2);

    SELECT COUNT(*), SUM(invoice_total)
    INTO invoices_count, invoices_total
    FROM invoices;
    
    SET risk_factor = invoices_total / invoices_count;
    SELECT risk_factor;
END $$
DELIMITER ; 
```



```mysql
DELIMITER $$  
CREATE FUNCTION get_risk_factor_for_client(
	client_id INT
)
RETURNS INTEGER
READS SQL DATA
BEGIN 
	DECLARE risk_factor DECIMAL(9,2) DEFAULT 0;
    DECLARE invoices_count INT;
    DECLARE invoices_total DECIMAL(9,2);

    SELECT COUNT(*), SUM(invoice_total)
    INTO invoices_count, invoices_total
    FROM invoices i
    WHERE i.cleint_id = client_id;
    SET risk_factor = invoices_total / invoices_count;
    RETURN risk_factor;

END $$
DELIMITER ;   
```

```mysql
SELECT 
	client_id,
    name,
    get_risk_factor_for_client(client_id)
FROM IFNULL(cleints,0);
```



**Chapter 10: Triggers触发器**

```mysql
DELIMITER $$  
CREATE TRIGGER payments_after_insert
	AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total + NEW.amount
    -- NEW.amount access the amount of the newest payment
    WHERE invoice_id = NEW.invoice_id;
END $$
```

```mysql
DELIMITER ;INSERT INTO payments
VALUES(DEFAULT, 5,3,'2019-01-01', 10,1);
```



* Viewing Trigger

```mysql
SHOW TRIGGERS LIKE "pamemt%";
```



* Dropping Trigger

```mysql
-- Using Triggers for Auditing

CREATE TRIGGER payments_after_insert
	AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total + NEW.amount
    -- NEW.amount access the amount of the newest payment
    WHERE invoice_id = NEW.invoice_id;
    

	INSERT INTO payment_audit
	VALUES(NEW.client_id, NEW.date, NEW.amount, 'INSERT', NOW());

END $$

INSERT INTO payments
VALUES(DEFAULT, 5,3,'2019-01-01', 10,1);
```



```mysql
DROP TRIGGER payments_after_delete;
DELIMITER $$ 
CREATE TRIGGER payments_after_delete
	AFTER DELETE ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total - OLD.amount
    WHERE invoice_id = OLD.invoice_id;

    INSERT INTO payment_audit
    VALUES(OLD.client_id, OLD.date, OLD.amount, 'DELETE', NOW());
END $$
```



* Events 事件

```mysql
DELIMITER $$
CREATE EVENT yearly_delete_stale_delete_rows
ON SCHEDULE 
	EVERY 1 YEAR STARTS '2019-01-01' ENDS '2019-01-01'
DO BEGIN 
	DELETE FROM payments_audit
    WHERE action_date < now() - INTERVAL 1 YEAR;
END $$
```



```mysql
SHOW EVENTS like 'yearly%';
DROP EVENT IF EXISTS yearly_delete_stale_audit_rows;
ALTER EVENT ...
ALTER EVENT yearly_delete_stale_audit_rows ENABLE;
```



**Chapter 11: Transaction**

​	-- Atomicity
​	-- Consistency
​	-- Isolation
​	-- Durability

* Create Transaction

```mysql
START TRANSACTION;
INSERT INTO orders(customer_id, order_date,status)
VALUES(1,'2019-01-01', 1);
INSERT INTO order_item
VALUES(LAST_INSERT_ID(),1,1,1);
COMMIT;
```

* Concurrency and Locking

Update，Delete和Insert等操作是事务，一个事务正在操作表的时候，表会被锁，另外一个事务必须等待。



* Concurrency Problem

```
Lost Update
Dirty Reads
Non-Repeating
Phantom Reads 执行查询后才添加，更新或者删除的
```

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621055931029.png" alt="image-20210621055931029" style="zoom:25%;" />

-- Stick to the default in most scenarios,  and only change the isolation level if you really have to.



* How to set the isolation level?

```mysql
SHOW VARIABLES LIKE 'transaction_isolation%';   
-- REPEATABLE-READ
SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```



* Deadlock

We can never really get rid of them, we can just minimize their likelihood.

-- Follow the same order, when update the same records.

-- Keep transactions small and short in duration

-- Run the transactions during none peak hours

```mysql
START TRANSACTION;
UPDATE customers SET state = 'VA' WHERE customer_id = 1;
UPDATE orders SET status = 1 WHERE order_id = 1;
COMMIT;
```

```mysql
START TRANSACTION;
UPDATE orders SET status = 1 WHERE order_id = 1;
UPDATE customers SET state = 'VA' WHERE customer_id = 1;
COMMIT;
```



**Chapter 12: Data Type**

-- Numeric Types

-- Date and Time Types

-- Blob Types

-- Spatial Types



* String Types

```
CHAR  
	-- fixed-length
VARCHAR 
    -- VARCHAR(50)  for short like username and password
    -- VARCHAR(250) for longer strings like email, address
    -- max. 65535 characters(64k)
MEDIUMTEXT
	-- max. 16MB
	-- for JSON, SCV, short/medium length books
LONGTXT
	-- max. 4GB
	-- for textbooks, years of logfiles
----------------------------------------------------------------
TINITEXT
	-- max:255 bytes
TEXT
	-- 64KB
-----------------------------------------------------------------
BYTES
	-- English                 1b
	-- European Middle-Eastern 2b
	-- Asian                   3b
	
```

* Integer

######      <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621112632225.png" alt="image-20210621112632225" style="zoom:25%;" />

```
-- INT(4) only affects how SQL show the data, doesn't affect how SQL store the data.

-- Use the smallest data type that suits your needs.
```



* Fixed-Point and Floating-Point Types

```
rationals
DECIMAL(p, s) 
-- fixed-point data, need provide precision and scale
-- DEC NUMERIC FIXED are synonym
-- for monetary values with exact values
------------------------------------------------------
FLOAT   4b
DOUBLE  8b
-- To calculate very small or very big numbers, use approximation
-- For scientific calculations, where precision is not important
```



* Boolean Types

  BOOL / BOOLEAN
  -- TRUE and FALSE are synonym to 1 and 0

  

* Enum and Set Types

  ​	-- you should avoid use Enums



* Date and Time Types

######        <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621114955334.png" alt="image-20210621114955334" style="zoom:25%;" />



* Blob Type

  -- for data like pictures, videos, pdf, word and all other binary data.

  --better keep the files out of the database, database are for structured relational data, not binary data.

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621121940080.png" alt="image-20210621121940080" style="zoom:25%;" />



* JSON Type

  Lightweight format for storing and transferring data over the Internet.

  Add JSON data:

```mysql
UPDATE products
SET properties = '{
	"dimensions": [1,2,3],
    "weight": 10,
    "manufactory": {"name": "sony"}
}'
WHERE product_id = 1;

-- or

UPDATE products
SET properties = JSON_OBJECT({
	"dimensions": JSON_ARRAY(1,2,3),
    "weight": 10,
    "manufactory": ("name": "sony")
})
WHERE product_id = 1;
```


Select JSON:

```mysql
SELECT product_id, JSON_EXTRACT(properties, '$.weight')
-- SELECT product_id, JSON_EXTRACT(properties->'$.weight')
-- SELECT product_id, JSON_EXTRACT(properties->'$.demensions[0]')
-- SELECT product_id, JSON_EXTRACT(properties->>'$.manufactory.name') -- 多加一个箭头查询结果里没有双引号
FROM products
WHERE product_id = 1;
```



Update a part of JSON data:

```mysql
UPDATE products
SET properties = JSON_SET(
	properties,
	'$.weight', 20
	'$.age', 10
)
```



Remove:

```mysql
UPDATE products
SET properties = JSON_REMOVE(
	properties,
	'$.age'
)
where product_id = 1;
```



**Chapter 13: Designing Database**

* Data Modelling

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621190430138.png" alt="image-20210621190430138" style="zoom:25%;" />

​	-- Logical Model is independent of database technology. 

​	-- Physical Model is defined in specific database, defined date type and so on.



* Conceptual Model

  -- Entity Realationship

  -- UML

  -- popular tools:

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210621191127260.png" alt="image-20210621191127260" style="zoom:25%;" />



* Primary Key

* Foreign Key

* Foreign Key Constraints 

* Normalization

  -- The First Normal Form: Each cell should have a single value, and we can't have repeated columns.

  -- The Second Normal Form: Every table should describe one entity, and every column in that table should describe that entity.

  -- A column in a table should not be derived from other columns.

* Link Table

* My Pragmatic Advice

  -- Don't worry about memorize the normalization rules.

  -- Don't jump into creating tables!

  -- Don't Model the universe! Solve the problems not future problems that may never hanppen.

  

* Forward Engineering Model

  -- Convert the Physical Model to a Physical Database.

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210622132830997.png" alt="image-20210622132830997" style="zoom: 33%;" />

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210622132932834.png" alt="image-20210622132932834" style="zoom: 50%;" />



* Synchronizing a Model

* Reverse Engineering a Database

* Project: Flight Booking System

  Solution Step 1: Conceptual Model



* Creating Database

```mysql
CREATE DATABASE IF NOT EXISTS sql_store2;
```

* Drop Database

```mysql
DROP DATABASE IF EXISTS sql_store2;
```

* Create Table

```mysql
USE sql_store2;
CREATE TABLE IF NOT EXISTS customers(
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,	
	points INT NOT NULL DEFAULT 0,
	email  VARCHAR(255) NOT NULL UNIQUE
);
```



* Altering Table

  -- Don't alter table under production environment, that can have bad consquense.

  -- Try changes on test database, make sure they work, make sure they don't have bad impact.

```mysql
ALTER TABLE customers
	ADD last_name VARCHAR(50) NOT NULL AFTER first_name,
	ADD city VARCHAR(50) NOT NULL,
	MODIFY COLUMN first_name VARCHAR(55) DEFAULT '',
	DROP points;
```



* Creating Relationship

```mysql
DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
	order_id INT PRIMARY KEY,
	customer_id INT NOT NULL,
	CONSTRAINT fk_orders_customers FOREIGN KEY(customer_id)
    	REFERENCES customers(customer_id)
    	ON UPDATE CASCADE
    	ON DELETE NO ACTION
);
```

​	-- To delete the customers table ,first we need to delete orders table. So we need to delete the tables in the following order:

```mysql
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
```



* Altering Primary and Foreign Key Constraint

```mysql
ALTER TABLE orders
	ADD PRIMARY KEY(order_id),
    DROP PRIMARY KEY,
	DROP FOREIGN KEY fk_orders_customers,
    ADD FOREIGN KEY fk_orders_customers(customer_id)
		REFERENCES customers(customer_id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION;
```



* Character Set and Collations

  SHOW CHARSET; 

  -- CHAR(10) use utf-8 -> 10*3 = 30 Byte because utf-8 reserve 3 byte for each character.

<img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210623115904249.png" alt="image-20210623115904249" style="zoom: 50%;" /><img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210623115946675.png" alt="image-20210623115946675" style="zoom:50%;" />     

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210623120135150.png" alt="image-20210623120135150" style="zoom: 33%;" />



```mysql
CREATE DATABASE db_name
	CHARACTER SET latin1;
    
ALTER DATABASE db_name
	CHARACTER SET latin1;
-- --------------------------------------------------    
CREATE TABLE table1(
    	...
)
CHARACTER SET latin1;

CREATE TABLE table1(
	first_name VARCHAR(50) CHARACTER SET latin1
)

ALTER TABLE table1
CHARACTER SET latin1;
```

* Storage Engines

  MyISAM 

  InnoDB --  can add foreign keys

  -- changing engines can be expensive operation, because mySQL have to rebuild all the tables.

```mysql
ALTER TABLE customer
ENGINE = InnoDB;
```



**Chapter 14: Indexing for High Performance**

* Indexes

  -- Cost of indexes: Increase the database; Slow down the writes.

  -- We should reserve indexes for performance critical queries. 

  -- Design indexes based on your queries, not your tables.

```mysql
CREATE INDEX idx_state ON customers(state);
```

* Viewing Indexes

```mysql
SHOW INDEXES IN customers;
```



* Prefix Indexes

```mysql
SELECT COUNT(DISTINCT LEFT(last_name, 5)) FROM customers;
```



* Full-text Indexes

```mysql
CREATE FULLTEXT INDEX idx_title_body ON posts(title, body);
SELECT *, MATCH(title, body) AGAINST ('react redux') as relavate_score
FROM posts
WHERE MATCH(title, body) AGAINST('react redux');
```

```mysql
CREATE FULLTEXT INDEX idx_title_body ON posts(title, body);
SELECT *, MATCH(title, body) AGAINST ('react redux') as relavate_score
FROM posts
WHERE MATCH(title, body) AGAINST('react -redux +form' IN BOOLEAN MODE);
-- Natrual language mode is the default mode.
-- We also have boolean mode, to exclude or include certain words.

-- WHERE MATCH(title, body) AGAINST('"handling a from"' IN BOOLEAN MODE); 
-- returns the title or body that contains exactly "handling a from"
```



* Composite Indexes

  -- Max. a index can include 16 columns.

```mysql
use sql_store;
CREATE INDEX idx_state_points ON customers(state, points);
EXPLAIN SELECT customer_id FROM customers
WHERE state = 'CA' AND points > 1000;
```

```mysql
DROP INDEX idx_points ON customers;
DROP INDEX idx_state ON customers;
```



* Orders of Columns in Composite Indexes

  * Order of Columns

    -- Put the most frequently used columns first

    -- Put the high cardinality columns first

    -- Take your queries into account

    

* When Indexes are Ignored

  Example 1:

```mysql
EXPLAIN SELECT customer_id FROM customers
WHERE state = 'CA' OR points > 1000;
-- mySQL will excute a full index scan
```

​	A better solution:

```mysql
CREATE INDEX idx_points ON customers(points);
EXPLAIN 
SELECT customer_id FROM customers
WHERE state = 'CA'
UNION
SELECT customer_id FROM customers
WHERE points > 1000;
```

​	Example 2:

```mysql
EXPLAIN SELECT customer_id FROM customers
WHERE points + 10 > 2010;
-- mySQL will excute a full index scan, because of the expression points + 10
```



* Using indexes for Sorting 

```mysql
EXPLAIN SELECT customer_id FROM customers ORDER BY state;
-- Doing a full index scan

EXPLAIN SELECT customer_id FROM customers ORDER BY first_name;
-- Doing a full table scan,which is expensiver than index scan.
-- Generally don't sort data unless neccesary.

-- Columns after ORDER BY should be in the same order as the columns in the indexes
-- Index order is: customer_id, state, points
-- This means the following ORDER BY will have less time-consuming
-- (state,points)
-- state
-- state, points
-- state DESC, points DESC

```



* Covering Indexes

```mysql
EXPLAIN SELECT customer_id, state, points FROM customers ORDER BY first_name;
-- mySQL will use index scan, but if we select anything else, mySQL will use full table scan.
-- Look at WHERE, ORDER BY, SELECT clause, if columns after these key words are in index table, called covering index, mySQL will execute index query. 

```



* Index Maintenance

  -- Before creating new indexes, check the existing ones.

  

**Chapter 15: Securing Database**

* Creating a User

```mysql
CREATE USER john@'%.codewithmosh.com' IDENTIFIED BY '123456';
```

* Viewing Users

```mysql
SELECT * FROM mysql.user;
```

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210624124457105.png" alt="image-20210624124457105" style="zoom: 50%;" />



* Dropping Users

```mysql
CREATE USER bob@codewithmosh.com IDENTIFIED BY '123456';
DROP USER bob@codewithmosh.com;
```



* Changing Password

  Like this:

```mysql
SET PASSWORD FOR john = '123456';
```

​		or:

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210624124852017.png" alt="image-20210624124852017" style="zoom:50%;" />



* Granting Privileges

  web/desktop application

```mysql
CREATE USER moon_app IDENTIFIED BY '123456';

GRANT SELECT ,INSERT, UPDATE, DELETE, EXECUTE 
ON sql_store.*
TO moon_app;
```

​	admin

```mysql
GRANT ALL
ON *.*
TO john;
```



* Viewing Privileges

```mysql
SHOW GRANTS FRO john;
SHOW GRANTS; -- show the current user
```

###### <img src="C:\Users\hanyi\AppData\Roaming\Typora\typora-user-images\image-20210624130235168.png" alt="image-20210624130235168" style="zoom:50%;" />



* Revoking Privileges

```mysql
GRANT CREATE VIEW
ON 	sql_store.*
TO moon_app;

REVOKE CREATE VIEW
ON sql_store.*
FROM moon_app;
```

