compare date：

```mysql
select *  from customers where birth_date > '1990-01-01'; 
#这里只能用双引号或者单引号
```

or

```mysql
select *  
from customers 
where birth_date >'1990-00-00' or points > 1000 and state = 'VA'; 
# and拥有比or更高的优先级，所以上一句等价于： 
# where birth_date >'1990-00-00' or (points > 1000 and state = 'VA');
```

like：

-- % any number of characters 
-- _ single character

```mysql

select *  
from customers  
where last_name like 'b%';  
或者 where last_name like '___y' 
```

regexp：

-- ^ beginning
-- $ end
-- | logical or
-- [abcd] specific letters
-- [a-z] range a - z

```mysql
select *
from customers 
where last_name regexp 'field';
-- 上面正则表达式跟下面语句意思一样
-- where last_name like '%field%'

-- 以下表示必须以field开头
-- where last_name regexp '^field';

-- 以下表示必须以field结尾
-- where last_name regexp 'field$'

-- 名字中包含field或者名字中包含mac的顾客
-- where last_name regexp 'field | mac'

-- 名字中ge ie me的顾客的名字
-- where last_name regexp '[gim]e';

-- where last_name regexp '[a-z]e';
```

```mysql
 select *
 from customers
 where first_name  regexp 'ambur|elka';
 -- be careful, no space before and after |, otherweise no result
```

search for absent value:

```mysql
select *
from customers
where phone is null;

-- get the order that are not shipped yet
select *
from orders
where shipped_date is null;
```

order by:

```mysql
select first_name, last_name, 10 as points
from customers
order by birth_date, points 
-- no problem, but may not work in other type of Database


select first_name, last_name, 10 as points
from customers
order by 1, 2 
-- first order by first_name, then order by last_name, it works, but should avoid do it
```

limit:

```mysql
select *
from customers
limit 6,3
-- skip 6 records then pick 3 records 
-- limit should always comes at the last
```

(inner) join:

```mysql
select customers.customer_id, order_id, first_name, last_name
from orders
join customers 
on customers.customer_id = orders.customer_id;
-- or
select c.customer_id, order_id, first_name, last_name
from orders o
join customers  c 
on c.customer_id = o.customer_id;

-- practise
select *
from order_items o 
join products p on o.product_id = p.product_id;
```



```mysql
use sql_inventory;
select *
from sql_store.order_items oi  
--  we're not in the databse table sql_store, so we have to prefix the database name before the table 
-- order_items
join products p 
on oi.product_id = p.product_id
```



Join a table with itself：

```mysql
select e.employee_id,
	   e.first_name,
       m.first_name manager
from employees e
join employees m on e.reports_to = m.employee_id;
```



join more than two tables:

```mysql
select c.name, c.client_id, p.amount, pm.name
from payments p 
join clients c 
	on p.client_id = c.client_id 
join payment_methods pm 
	on pm.payment_method_id = p.payment_method;
```



composite primary key

```mysql
select *
from order_items oi
join order_item_notes oin
   	on oi.order_id = oin.order_id
    and oi.product_id = oin.product_id;
```

Implicit Join Syntax  隐式连接 不推荐使用

```mysql
select *
from orders o , customers c 
where o.customer_id = c.customer_id;
```



**Outer Join**

Left Join

```mysql
select 
	c.customer_id,
	c.first_name,
	o.order_id
from customers c
left outer join orders o
	on c.customers_id = o.customer_id
order by c.customer_id;
-- all the records of customer_id,first_name and order_id from the customers table will be returned, wether the condition after on is true or not.
-- the outer key word is optional
```

right join

```mysql
select 
	c.customer_id,
	c.first_name,
	o.order_id
from customers c
right outer join orders o
	on c.customers_id = o.customer_id
order by c.customer_id;
-- all the records of customer_id,first_name and order_id from the orders table will be returned, wether the condition after on is true or not.
-- the outer key word is optional
```

joining more tables

```mysql
select 
	c.customer_id,
	c.first_name,
	o.order_id,
	sh.name as shipper
from customers c
left join orders o
	on c.customers_id = o.customer_id
left join shippers sh
	on o.shipper_id = sh.shipper_id
order by c.customer_id;
```

self outer join 自外连接：

```mysql
select e.employee_id,
	   e.first_name,
       m.first_name manager
left from employees e
join employees m on e.reports_to = m.employee_id;
```

using clause

```mysql
select 
	c.customer_id,
	c.first_name,
	o.order_id,
from customers c
join orders o
	--  c.customers_id = o.customer_id;
	using (customers_id);  
	-- only works when column name are the same
```



natural joins

```mysql
select *
from orders
natural join customers;
-- not recommended， produce unexpected result
```

cross join：

```mysql
select 
	c.first_name name
	p.name product
from customers c
cross join products p
-- or like this:
-- from customers c, products p
order by c.first_name;
```

Unions

combine records from several queries

列名显示第一个表的

查询结果列的数量要相同，否则无法union

```sql
select 
	order_id,
	order_date,
'Active' as status
from orders
where order_date >= '2019-01-01'
union
select 
	order_id,
	order_date,
'Archived' as status
from orders
where order_date < '2019-01-01'
```

Column Attribute

Insert Into

顺序可变，但是要前后对应

```mysql
insert into customers
values (default, 'John', 'Smith', '1990-01-01', null, 'address', 'city', 'CA',default);
```

```mysql
insert into customers(first_name, last_name, birth_date, address, city, state)
values ('John', 'Smith', '1990-01-01', 'address', 'city', 'CA');
```

insert multiple rows in one go

```mysql
insert into shippers(name)
values ('shipper1'),
		('shipper2'),
		('shipper3'),
```



insert hierarchical rows 多个表中插入行

```mysql
insert into orders(customer_id, order_date, status)
values(1,'2019-01-02', 1);

insert into order_items
values(LAST_INSERT_ID(), 1,1,2,95)
values(LAST_INSERT_ID(), 1,1,2,95);
```



create a copy

```mysql
use sql_invoicing;
create table invoices_archive as
select 
	i.invoice_id,
    i.number,
    c.name,
    i.invoice_total,
    i.payment_total
from invoices i
join clients c 
	on c.client_id = i.client_id
where i.payment_date is not null;
```



updating multiple rows:

```mysql
update customers
set points = points + 50
where birth_date < '1990-01-01';
```



using subqueries in update:

```mysql
set comments = "gold customer"
where  customer_id in 
    (select customer_id
    from customers
    where points>3000) ;
```

delete 

```mysql
delete from invoices
where invoice_id = 1;
```



**Aggregate Functions:**

```mysql
select MAX(payment_date)
	MIN(invoice_total)
	AVG(invoice_total)
	SUM(invoice_total * 1.1)
	COUNT(invoice_total)
	-- count returns not null invoice_total
	COUNT(*) as total_records
	COUNT(distinct client_id)
from invoices
where invoice_date > '2019-01-01';
```



```mysql
use sql_invoicing;

select 
	'First half of 2019' as date_range,
	SUM(invoice_total) as total_sales,
    SUM(payment_total) as total_payments,
    SUM(invoice_total)-SUM(payment_total) as 'what we expect'
from invoices
where payment_date between '2019-01-01' and '2019-06-30'
union
select 
	'Second half of 2019' as date_range,
	SUM(invoice_total) as total_sales,
    SUM(payment_total) as total_payments,
    SUM(invoice_total)-SUM(payment_total) as 'what we expect'
from invoices
where payment_date between '2019-07-01' and '2019-12-31'
union
select 
	'Total' as date_range,
   SUM(invoice_total),
   SUM(payment_total),
   SUM(invoice_total - payment_total)
from invoices i
where payment_date between '2019-01-01' and '2019-12-31';
```

​    

Group By:

```mysql
select 
	client_id,
    SUM(invoice_total) as total_sales
from invoices
where invoice_date > '2019-07-01'
group by client_id
order by totao_sales desc;
```



```mysql
select 
	date, 
	payment_method, 
	SUM(amount) total_payment
from payments
group by date,payment_method
order by date;
```



Having

Using having clause to filter data after group by， only reference to columns selected.

Where filter data before group by, can reference any columns.

Having 语句后面的选项一定是select里选择了的列。Where后面可以随便跟那个列。

```mysql
select 
	first_name,
    last_name,
    order_id,
    SUM(oi.quantity*oi.unit_price) as order_price
from customers c
left join orders o using (customer_id)
left join order_items oi using(order_id)
where (o.order_id is not null) and (c.state = 'VA')
group by 
	first_name,
    last_name,
    order_id
HAVING order_price > 100;
```



Rollup:

```mysql
select 
	pm.name as 'payment method',
    SUM(amount)
from payments p
join payment_methods pm
	on p.payment_method = pm.payment_method_id
group by pm.name with rollup;
```



Chapter 6: Complicated Subqueries 

```mysql
use sql_store;
select *
from products 
where unit_price > (
	select 
		unit_price
	from products
    where product_id = 3
);
```



```mysql
use sql_hr;
select *
from employees
where salary > (
	select avg(salary)
    from employees
);
```



Find products that had never been ordered.

```mysql
use sql_store;
select *
from products
where product_id not in (
	select product_id
    from order_items
);
```

Pay attention to readability.



P48 find the customers who had ordered Lettuce, product_id = 3.

```mysql
select 
	c.customer_id,
    c.first_name,
    c.last_name
from customers c
join orders o using(customer_id)
join order_items oi using(order_id)
where oi.product_id = 3;
```

Use All:

```mysql
use sql_invoicing;
select *
from invoices
where invoice_total > All(
	select invoice_total
    from invoices
    where client_id = 3
);
```



Use Any:

```mysql
select *
from invoices
where invoice_total = Any (
	select invoice_total
    from invoices
    where client_id = 3
);
```



Correlated Subqueries相关子查询：

```mysql
select *
from employees e
where salary > (
	select avg(salary)
    from employees
    where office_id = e.office_id
);
```



Exits Operator

more efficiency than In Operator

```mysql
select *
from products p
where not exists (
	select 
		product_id
	from order_items
    where p.product_id = product_id
);
```

Subqueries in SELECT clause:

```mysql
select 
	invoice_id,
    invoice_total,
    (select avg(invoice_total) from invoices) as invoice_avg,
    invoice_total - (select invoice_avg)
    -- 注意这里select invoice_avg，必须这样，否则识别不了invoice_avg
from invoices;
```

Subqueries in FROM clause:

Numeric and String Function:

```mysql
select ROUND(5.7345,2);  5.73 四舍五入
select ROUND(5.7345,2);  5.73 截断
select CEILING(5.7)  6 
select FLOOR(5.2) 5
SELECT ABS(-5.2)  5.2
SELECT RAND() 生成0-1之间的随机浮点数
SELECT LENGTH('SKY') 3
SELECT UPPER('sky') SKY
SELECT LOWER('SKY') sky
SELECT LTRIM('  Sky') 删除左边空格
SELECT RTRIM('Sky   ') 删除右边空格
SELECT LEFT('Kindergarten'， 6) 返回字符串右侧的6个字符
SELECT SUBSTRING('Kindergarten'，3,5) 从3开始选取5个字符
SELECT LOCATE('n','Kindergarten') 找出有几个n，不区分大小写
SELECT LOCATE('q','Kindergarten') 没找到，返回0
SELECT REPLACE('Kindergarten', 'garten', 'garden') 输出：Kindergarden
SELECT CONCAT('first', 'last') firstlast
```



Date and Time

```mysql
select  now(),
		curdate(),
		curtime(),
		year(now()),
		month(now()),
		day(now()),
		hour(now()),
		dayname(now()), 星期几
		monthname(now()) 月的名字比如March
select extract(year from now());

select DATE_FORMAT(NOW(), '%M %d %Y')
select TIME_FORMAT(NOW(), '%H: %i %p')

select date_add(now(), interval 1 day) 返回明天同一时间
select date_sub(now(), interval 1 year)
select datediff('2019-01-05 09:00', '2019-01-01 17:00') 得到的结果依然是4，不考虑时间
select time_to_sec('9:00')-time_to_sec('9:02')

```

IFNULL and COALESCE functions

```mysql
select 
	order_id,
	ifnull(shipper_id, 'not assigned')
-- if the shipper_id is null, not assigned will be returned
from orders
```

```mysql
select 
	order_id,
	coalesce(shipper_id, comment, 'not assigned')
-- if the shipper_id is null, commets will be returned,
-- if commets are null, not assigned will be returned
from orders
```



14.06.2021

**IF  Function****

```mysql
if(expression, first, second)
```

```mysql
select 
	order_id, 
	order_date, 
	if(year(order_date=year(now())), 'Active', 'Archived')
from orders
```

exercise

```mysql
select 
	product_id,
    p.name,
    count(*),
    if(count(*)>1, 'Many times', 'Once') as frequency
from order_items
join products p using (product_id)
group by product_id
```



**The Case Function**

Test multiple expressions.

```mysql
select 
	concat(first_name, ' ', last_name) as customer,
    points,
    case
		when points > 3000 then 'Gold'
        when points >= 2000 then 'Silver'
        else 'Bronze'
	end as category
from customers
order by points desc;
```



**Creating views**

```mysql
create view sales_by_client as
select
	client_id,
    c.name,
    sum(invoice_total - payment_total) as balance
from invoices
join clients c using(client_id)
group by client_id, c.name;

drop view sales_by_cleint;
```



**Updatable View**

**<u>without the following key words, a view is updatable.</u>**

**<u>-- distinct</u>**

**<u>-- aggregate Functions(MIN, MAX, AVG...)</u>**

**<u>-- group by/having</u>**

**<u>-- union</u>**

We can update the view like this:

```mysql
delete from invoices_with_balance
where invoice_id = 1;
```

```mysql
update invoices_wiht_balance
set due_date = date_add(due_date, interval 2 day)
where invoice_id = 2;
```

如果视图只有表的一部分列，那么更新视图的时候必须更新表中所有的列，即使这些列视图里没有。

修改视图以后行可能会消失，为了防止这样的行为产生，可以使用with check option

Benefits of Views

1, simplify the queries

2, reduce the impact of changes, due to database design

3, Restrict access to the data

**Stored Procedures**

