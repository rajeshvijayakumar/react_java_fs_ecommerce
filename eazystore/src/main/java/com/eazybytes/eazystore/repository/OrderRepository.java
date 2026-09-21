package com.eazybytes.eazystore.repository;

import com.eazybytes.eazystore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Fetch orders for a customer, sorted by creation date in descending order.
     */
    /*List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);

    // Fetching orders using JPQL (Java persistent query language)
    @Query("SELECT o FROM Order o WHERE o.customer=:customer ORDER BY o.createdAt DESC")
    List<Order> findOrdersByCustomer(@Param("customer") Customer customer);
*/
    // Fetching orders using native SQL query
    @Query(value = "SELECT * FROM orders o WHERE o.customer_id=:customerId ORDER BY o.created_at DESC"
            , nativeQuery = true)
    List<Order> findOrdersByCustomerWithNativeQuery(@Param("customerId") Long customerId);

    /**
     * Fetch order based on order status
     */
    List<Order> findByOrderStatus(String orderStatus);

    // Fetching specific order by order status using JPQL (Java persistent query language)
    @Query("SELECT o FROM Order o WHERE o.orderStatus=?1")
    List<Order> findOrdersByStatus(String orderStatus);

    // Fetching specific order by order status using Native SQL query
    @Query(value = "SELECT * FROM orders o WHERE o.order_status=?1", nativeQuery = true)
    List<Order> findOrdersByStatusWithNativeQuery(String orderStatus);


    // Update query with auditing the table updates using updatedAt and updatedBy using native SQL query
    @Transactional
    @Modifying
    @Query("UPDATE Order o SET o.orderStatus=:orderStatus,o.updatedAt=CURRENT_TIMESTAMP,o.updatedBy=:updatedBy WHERE o.orderId=:orderId")
    int updateOrderStatus(@Param("orderId") Long orderId, @Param("orderStatus") String orderStatus,
                          @Param("updatedBy") String updatedBy);


}