use sql_store;
select * 
from customers 
-- customer_id = 1
order by first_name;

select name, unit_price, unit_price *1.1 as `new price` 
from products;

select * 
from customers
where birth_date > '1990-01-01'; 
-- 这里只能用双引号或者单引号

select * from orders where order_date > '2019-00-00';

select * 
from customers
where birth_date >'1990-00-00' or points > 1000 and state = 'VA';

select * from order_items where order_id = 6 and quantity*unit_price > 30;

select *from products where quantity_in_stock in (49,38,72);

select * from customers where birth_date between '1990-00-00' and '2000-00-00';

select * from customers where last_name like 'b%';

select * from customers where address like '%trail%' or '%avenue%';

select *
from customers 
-- where last_name like '%field%'
 where last_name regexp 'field';
 
 select *
 from customers
 where first_name  regexp 'ambur|elka';
 
 select *
 from customers
where last_name regexp 'ey$|on$';

 select *
 from customers
where last_name regexp '^my|se';

 select *
 from customers
where last_name regexp 'b[ru]';

 select *
 from customers
where phone is null;

 select *
 from orders
where shipped_date is null;

select *
from order_items 
where order_id = 2
order by quantity*unit_price desc;

select *
from customers
order by points desc
limit 3;

select customers.customer_id, order_id, first_name, last_name
from orders
join customers on customers.customer_id = orders.customer_id;

select *
from order_items o 
join products p on o.product_id = p.product_id;

use sql_hr;

select e.employee_id,
	   e.first_name,
       m.first_name manager
from employees e
join employees m on e.reports_to = m.employee_id;

use sql_store;
select *
from orders o
join customers c
  on o.customer_id = c.customer_id
join order_statuses os 
   on o.status = os.order_status_id;
use sql_invoicing;

select c.name, c.client_id, p.amount, pm.name
from payments p 
join clients c 
	on p.client_id = c.client_id 
join payment_methods pm 
	on pm.payment_method_id = p.payment_method;
   
use sql_store;
select *
from order_items oi
	join order_item_notes oin
    on oi.order_id = oin.order_id
    and oi.product_id = oin.product_id;
    
select *
from orders o , customers c 
where o.customer_id = c.customer_id;

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


select p.product_id, p.name, o.quantity
from products p 
left join order_items o
	on p.product_id = o.product_id;

select o.order_date, o.order_id, c.first_name, s.shipper_id, os.name
from orders o
join customers  c 
	on o.customer_id = c.customer_id
left join shippers s
    on o.shipper_id = s.shipper_id
left join order_statuses os
	on os.order_status_id = o.status;

use sql_invoicing;

select p.date,
		c.name client,
        p.amount,
        pm.name
from payments p
join clients c
    using(client_id) 
 left join payment_methods pm
	on pm.payment_method_id = p.payment_method;

use sql_store;
select *
from orders
natural join customers;


insert into customers(first_name, last_name, birth_date, address, city, state)
values ('John', 'Smith', '1990-01-01', 'address', 'city', 'CA');  


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
	
use sql_store;

update orders
set comments = "gold customer"
where  customer_id in 
    (select customer_id
    from customers
    where points>3000) ;
    
use sql_invoicing;

select 
	'First half of 2019' as date_range,
	SUM(i.invoice_total) as total_sales,
    SUM(i.payment_total) as total_payments,
    SUM(i.invoice_total)-SUM(i.payment_total) as 'what we expect'
from invoices i
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
   SUM(i.invoice_total),
   SUM(i.payment_total),
   SUM(i.invoice_total - i.payment_total)
from invoices i;
    
select 
	client_id,
    SUM(invoice_total) as total_sales
from invoices
where invoice_date > '2019-07-01'
group by client_id
order by totao_sales desc;

select 
	date, 
	pm.name, 
	SUM(amount) total_payment
from payments p
left join payment_methods pm
	 on payment_id = pm.payment_method_id
group by date,payment_method
order by date;


use sql_store;
select *
from products 
where unit_price > (
	select 
		unit_price
	from products
    where product_id = 3
);

use sql_hr;
select *
from employees
where salary > (
	select avg(salary)
    from employees
);


use sql_store;

select 
	*
from products
where product_id not in (
	select product_id
    from order_items
);

use sql_invoicing;
select *
from clients
where client_id not in(
	select 
		distinct client_id
	from invoices
);

use sql_store;
select 
	distinct customer_id,
    first_name,
    last_name
from customers
where customer_id in (
	select customer_id
    from orders
    where order_id in (
		select order_id
        from order_items
        where product_id = 3
    )
);


select 
	c.customer_id,
    c.first_name,
    c.last_name
from customers c
join orders o using(customer_id)
join order_items oi using(order_id)
where oi.product_id = 3;

use sql_invoicing;
select *
from invoices
where invoice_total > All(
	select invoice_total
    from invoices
    where client_id = 3
);

select *
from employees e
where salary > (
	select avg(salary)
    from employees
    where office_id = e.office_id
);


use sql_invoicing;
select *
from invoices i
where invoice_total > (
	select 
		avg(invoice_total)
	from invoices
    where client_id = i.client_id
);
	
    
use sql_store;
select *
from products p
where p.product_id not in(
	select
		product_id
    from order_items
);

select *
from products p
where not exists (
	select 
		product_id
	from order_items
    where p.product_id = product_id
);

use sql_invoicing;
select 
	invoice_id,
    invoice_total,
    (select avg(invoice_total) from invoices) as invoice_avg,
    invoice_total - (select invoice_avg)
from invoices;

select 
	i.client_id,
	c.name,
	SUM(invoice_total) as total_sales,
	(select avg(invoice_total) from invoices) as average,
	SUM(invoice_total) - (select average) as difference
from invoices i
left join clients c using(client_id)
group by client_id;




select now();

use sql_store;
select 
	product_id,
    p.name,
    count(*),
    if(count(*)>1, 'Many times', 'Once') as frequency
from order_items
join products p using (product_id)
group by product_id;

select 
	concat(first_name, ' ', last_name) as customer,
    points,
    case
		when points > 3000 then 'Gold'
        when points >= 2000 and points <= 3000 then 'Silver'
        when points < 2000 then 'Bronze'
	end as category
from customers
order by points desc;

use sql_invoicing;

create view client_balance as
select
	client_id,
    c.name,
    sum(  invoice_total - payment_total) as balance
from invoices
join clients c using(client_id)
group by client_id, c.name;

use sql_invoicing;
delimiter $$
create procedure balance()
begin
	select *
	from invoices
	where invoice_total - payment_total > 0;
end $$
DELIMITER ;
call balance();




        


